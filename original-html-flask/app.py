import sqlite3

from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from cookie import Cookie
from helper_functions import login_required, usd
from customsql import CustomSQL

# Configure app
app = Flask(__name__)

# customise jinja filter for usd function
app.jinja_env.filters["usd"] = usd

# for simplicity sake, preconfigure cookie store products
db = CustomSQL("store.db")
# create table for products
db.execute(
    "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price REAL NOT NULL, img TEXT, desc TEXT, fav TEXT, seasonal TEXT);")
# input products into table
db.execute(
    "INSERT INTO products(name, price, img, desc, fav, seasonal)"
    "VALUES('Chocolate Cookies', 6.70, '/static/choco_cookie.jpg', 'Juicy chocolate with sweet and spicy tastes, beautiful and amazing, wonderfully rich fragrance. Bite into a whole new world of creamy chocolatey delight as you give your tastebuds a well-deserved treat.', 'no', 'no'),"
    "('Strawberry Cookies', 13.30, '/static/strawberry_cookie.jpg', 'Beautifully rich aroma.', 'yes', 'yes'),"
    "('Thumbdrive', 5.00, '/static/thumbdrive_cookie.jpg', 'Crunchy and flavourful data.', 'yes', 'no'),"
    "('Durian', 7.77, '/static/durian_cookie.png', 'Stinky.', 'yes', 'no'),"
    "('Keyboard', 27.90, NULL, NULL, NULL, NULL)"
    "ON CONFLICT(name) DO UPDATE SET price=excluded.price, img=excluded.img, desc=excluded.desc, fav=excluded.fav, seasonal=excluded.seasonal;")
# create table for transaction details
db.execute(
    "CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone_no TEXT NOT NULL, country TEXT NOT NULL, address TEXT NOT NULL, postal_code TEXT NOT NULL, delivery_datetime BLOB NOT NULL, card_no TEXT NOT NULL, card_exp TEXT NOT NULL, card_code TEXT NOT NULL, card_name TEXT NOT NULL, prediscount_amt REAL NOT NULL, transacted_amt REAL NOT NULL, transaction_datetime TEXT NOT NULL);")
# create table for transacted items
db.execute(
    "CREATE TABLE IF NOT EXISTS transacted_items(transaction_id INTEGER NOT NULL, item_name TEXT NOT NULL, item_price REAL NOT NULL, item_qty INTEGER NOT NULL, FOREIGN KEY(transaction_id) REFERENCES transactions(id));")
# create table for users
db.execute(
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, hash TEXT NOT NULL);")
# create table for user's saved cart
db.execute(
    "CREATE TABLE IF NOT EXISTS savedcart(user_id INTEGER NOT NULL, product_id INTEGER NOT NULL UNIQUE, qty INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(product_id) REFERENCES products(id));")


# Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
# In total there are 5 session variables defined: "cart"(list of dictionaries), "grandtotal"(float), "discounted"(float), "gift_code_status"(string), "user_id"(integer)


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# navbar functions


# searchbar (using jsonify to autocomplete searches)
@app.route("/search")
def search():
    q = request.args.get("q")
    if q:
        products = db.execute("SELECT * FROM products WHERE name LIKE ? LIMIT 3", f"%{q}%")
    else:
        products = []
    return jsonify(products)


# page functions


# homepage/products page
@app.route("/")
def index():
    # render all products
    cookies = db.execute("SELECT * FROM products;")
    return render_template("index.html", cookies=cookies)


# individual product pages (use POST to get cookie_id)
@app.route("/product", methods=["POST"])
def product():
    # POST (when user clicks on product on homepage, display product page)
    if request.method == "POST":
        cookie_id = request.form.get("id")
        cookie = db.execute("SELECT * FROM products WHERE id = ?;", cookie_id)[0]
        return render_template("product.html", cookie=cookie)


# favourites page
@app.route("/favs")
def favs():
    # render all products
    cookies = db.execute("SELECT * FROM products WHERE fav = 'yes';")
    return render_template("favs.html", cookies=cookies)


# seasonal page
@app.route("/seasonal")
def seasonal():
    # render all products
    cookies = db.execute("SELECT * FROM products WHERE seasonal = 'yes';")
    return render_template("seasonal.html", cookies=cookies)


# about page
@app.route("/about")
def about():
    return render_template("about.html")


# login functions


# profile page (requires login)
@app.route("/profile")
@login_required
def profile():
    # Get username
    username = db.execute("SELECT username FROM users WHERE id = ?;",
                          session["user_id"])[0]["username"]
    return render_template("profile.html", username=username)


# login page
@app.route("/login", methods=["GET", "POST"])
def login():
    # First clear any past logins
    session["user_id"] = None

    # POST (when user fills in login form, if successful direct to profile page)
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # If any field is empty, retry
        if not username:
            flash("Missing username!", "error")
            return redirect("/login")
        elif not password:
            flash("Missing password!", "error")
            return redirect("/login")
        # Ensure username exists and password is correct
        rows = db.execute("SELECT * FROM users WHERE username = ?;", username)
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], password
        ):
            flash("Invalid username and/or password!", "error")
            return redirect("/login")
        # Log user in
        session["user_id"] = rows[0]["id"]
        # On login, sync carts
        sync_carts("a")
        sync_carts("r")
        # Redirect user to profile page
        flash("Welcome!", "success")
        return redirect("/profile")

    # GET (when user clicks on profile icon, display login form)
    else:
        return render_template("login.html")


# log user out
@app.route("/logout")
def logout():
    session["user_id"] = None
    flash("You have logged out successfully~", "alert")
    return redirect("/login")


# register page
@app.route("/register", methods=["GET", "POST"])
def register():
    # POST (when user registers, check for possible errors, else insert the new user into users table)
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # If any field is missing, retry
        if not username:
            flash("Missing username!", "error")
            return redirect("/register")
        elif not password:
            flash("Missing password!", "error")
            return redirect("/register")
        elif request.form.get("confirmation") != password:
            flash("Passwords do not match!", "error")
            return redirect("/register")
        # If the username is already taken, retry
        rows = db.execute("SELECT * FROM users WHERE username = ?;", username)
        if len(rows) == 1:
            flash("Username is already taken!", "error")
            return redirect("/register")
        # Use generate_password_hash to generate a hash of the password
        password_hash = generate_password_hash(password)
        # Insert data entry into db
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?);", username, password_hash)
        # Log user in
        rows = db.execute("SELECT * FROM users WHERE username = ?;", username)
        session["user_id"] = rows[0]["id"]
        # Redirect to profile
        flash("Registration successful! Welcome~", "success")
        return redirect("/profile")

    # GET (display registration form)
    else:
        return render_template("register.html")


# cart functions


# shopping cart (add to cart, view cart)
@app.route("/cart", methods=["GET", "POST"])
def cart():
    # Ensure cart exists
    if "cart" not in session:
        session["cart"] = []

    # POST (i.e. when user adds item to cart from individual product page)
    if request.method == "POST":
        cookie_id = int(request.form.get("id"))
        cookie_qty = int(request.form.get("qty"))
        # add to session["cart"]
        # Note! This function is only for adding items so cookie_qty must > 0!
        if cookie_id and cookie_qty > 0:
            # if the cookie is already in session["cart"], update qty
            if any(cookie.id == cookie_id for cookie in session["cart"]):
                for cookie_obj in session["cart"]:
                    if cookie_obj.id == cookie_id:
                        cookie_obj.qty += cookie_qty
            # else if the cookie is not yet in session["cart"], add it as a new Cookie object
            else:
                cookie_name, cookie_price, cookie_img = db.execute(
                    "SELECT name, price, img FROM products WHERE id = ?;", cookie_id)[0].values()
                session["cart"].append(Cookie(cookie_id, cookie_name,
                                       cookie_price, cookie_qty, cookie_img))
        # also update savedcart if signed in
        if session.get("user_id") is not None:
            sync_carts("w")
            sync_carts("r")
        # once done render success message and stay on page
        flash("Item added to cart!", "success")
        return product()

    # GET (i.e. when user clicks on shopping cart icon)
    else:
        if len(session["cart"]) == 0:
            return render_template("emptycart.html")
        else:
            # first calculate total cost, then store it in session["grandtotal"]
            grandtotal = 0
            for cookie in session["cart"]:
                grandtotal += cookie.total
            session["grandtotal"] = grandtotal
            # display cart
            return render_template("fullcart.html", cookies=session["cart"], grandtotal=session["grandtotal"])


# edit cart qty
@app.route("/editcart", methods=["POST"])
def editcart():
    # POST (i.e. when user edits item qty)
    if request.method == "POST":
        cookie_id = int(request.form.get("id"))
        cookie_qty = int(request.form.get("qty"))
        if cookie_id:
            if cookie_qty > 0:
                if any(cookie.id == cookie_id for cookie in session["cart"]):
                    for cookie_obj in session["cart"]:
                        if cookie_obj.id == cookie_id:
                            cookie_obj.qty = cookie_qty
                # also update savedcart if signed in
                if session.get("user_id") is not None:
                    sync_carts("w")
                    sync_carts("r")
            # if cookie_qty == 0 remove item from cart
            if cookie_qty == 0:
                for nocookie_obj in session["cart"]:
                    if nocookie_obj.id == cookie_id:
                        session["cart"].remove(nocookie_obj)
                        # also update savedcart if signed in
                        if session.get("user_id") is not None:
                            db.execute(
                                "DELETE FROM savedcart WHERE user_id = ? AND product_id = ?;", session["user_id"], cookie_id)
        return redirect("/cart")


# allows syncing of session["cart"] and savedcart in sql
def sync_carts(op_type):
    # Ensure signed in
    if session.get("user_id") is not None:
        # If user already added an item to cart before login
        if "cart" in session:
            # add ("a") or update ("w") all items from session["cart"] into savedcart table
            if op_type == "a":
                for cookie in session["cart"]:
                    db.execute("INSERT INTO savedcart(user_id, product_id, qty) VALUES(?, ?, ?) ON CONFLICT(product_id) DO UPDATE SET qty=qty+excluded.qty",
                               session["user_id"], cookie.id, cookie.qty)
            elif op_type == "w":
                for cookie in session["cart"]:
                    db.execute("INSERT INTO savedcart(user_id, product_id, qty) VALUES(?, ?, ?) ON CONFLICT(product_id) DO UPDATE SET qty=excluded.qty",
                               session["user_id"], cookie.id, cookie.qty)
        # If user logs in when cart is still empty, and After reading to savedcart
        session["cart"] = []
        if op_type == "r":
            # Read all savedcart items into empty session["cart"]
            products = db.execute(
                "SELECT products.id, products.name, products.price, savedcart.qty, products.img FROM savedcart JOIN products ON savedcart.product_id=products.id WHERE user_id = ?;", session["user_id"],)
            for product in products:
                session["cart"].append(Cookie(product["id"], product["name"],
                                              product["price"], product["qty"], product["img"]))


# checkout functions


# checkout page
@app.route("/checkout", methods=["GET", "POST"])
def checkout():
    if "gift_code_status" not in session:
        session["gift_code_status"] = ""
    if "discounted" not in session:
        session["discounted"] = session["grandtotal"]

    # GET (when user clicks on checkout button in shopping cart)
    if request.method == "GET":
        # display checkout page
        return render_template("checkout.html", cookies=session["cart"], subtotal=session["grandtotal"], total=session["discounted"], gift_code_status=session["gift_code_status"])

    # POST (when user clicks on paynow button in checkout page)
    if request.method == "POST":
        # get all input details
        name = f"{request.form.get("fname")} {request.form.get("lname")}"
        email = request.form.get("email")
        phone_no = request.form.get("phone-no")
        country = request.form.get("country")
        address = request.form.get("address")
        postal_code = request.form.get("postal-code")
        delivery_datetime = request.form.get("delivery-datetime")
        card_no = request.form.get("card-no")
        card_exp = request.form.get("card-exp")
        card_code = request.form.get("card-code")
        card_name = request.form.get("card-name")
        # get the pre discounted amt
        prediscount_amt = request.form.get("prediscount")
        # get the final paid amount
        transacted_amt = request.form.get("paid")
        # enter user details into database
        db.execute("INSERT INTO transactions(name, email, phone_no, country, address, postal_code, delivery_datetime, card_no, card_exp, card_code, card_name, prediscount_amt, transacted_amt, transaction_datetime) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);",
                   name, email, phone_no, country, address, postal_code, delivery_datetime, card_no, card_exp, card_code, card_name, prediscount_amt, transacted_amt)
        # get the transaction id (using the latest data entry)
        transaction_id = db.execute(
            "SELECT id FROM transactions WHERE id=(SELECT max(id) FROM transactions);")[0]["id"]
        # enter transacted items into database
        for cookie in session["cart"]:
            db.execute("INSERT INTO transacted_items(transaction_id, item_name, item_price, item_qty) VALUES(?, ?, ?, ?)",
                       transaction_id, cookie.name, cookie.price, cookie.qty)
        # clear session and savedcart if logged in
        clear_session()
        # render receipt
        details = db.execute("SELECT * FROM transactions WHERE id = ?", transaction_id)[0]
        details["delivery_datetime"] = f"{delivery_datetime[:10]}, {delivery_datetime[11:]}"
        details["card_no"] = f"**** **** **** {details["card_no"][-4:]}"
        items = db.execute(
            "SELECT * FROM transacted_items WHERE transaction_id = ?", transaction_id)
        # show success message
        flash("Thank you for shopping with us! 😊", "alert")
        return render_template("receipt.html", details=details, items=items)


# when discount code is applied
@app.route("/giftcode", methods=["POST"])
def giftcode():
    # POST (when user applies gift code)
    input_code = request.form.get("gift-code")
    # check code
    if input_code == "YAY":
        session["discounted"] *= 0.9
        session["gift_code_status"] = f"Gift Code applied: \"{input_code}\" (10% off)"
    else:
        session["gift_code_status"] = "Invalid Gift Code!"
    return redirect("/checkout")


# clear all session items and savedcart items
def clear_session():
    # if logged in, clear all entries
    if session.get("user_id") is not None:
        db.execute("DELETE FROM savedcart WHERE user_id = ?", session["user_id"])
    # then clear all sessions
    session.clear()

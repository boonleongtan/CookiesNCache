# Boon Leong's CS50x Project Title: COOKIES & CACHE
${\textsf{\color{red}{Copyright ©2024 Tan Boon Leong. All rights reserved.}}}$

> [!CAUTION]
> This project was created (almost) entirely from scratch by the author. The author retains all rights to prohibit any form of distribution and/or usage of any or all of the materials contained within this project.

> [!WARNING]
> Please do not use any of the materials without asking for my permission, and please do remember to credit me even after I give my permission.

*Unlicensed usage and/or distribution of materials from this project is strictly prohibited.*

---

### Video Demo:  https://youtu.be/3_55Wi-5f70
### Description:

### ${\textsf{\color{YellowOrange}{What my project is about}}}$
This project is about creating an online website (for use with PC screens only—this project is not yet compatible with mobile) to allow users to order cookies and other products from a fictional cookie company by the name of Cookies & Cache.

### ${\textsf{\color{YellowOrange}{What each of the files I wrote for the project contains and does}}}$

#### ${\textsf{\color{YellowGreen}{app.py}}}$
Starting with the flask application that powers the whole project, we first import `sqlite3` to work with SQL, `flask` and `flask session` to run Flask, `werkzeug.security` to implement password checking and hashing, as well as other custom helper functions which will be explained in further detail later.

Next we configure the app to allow Flask to run, and customise the jinja filter for the usd function.

Following which, we establish a connection to the database we will be using for the rest of the program, which we create here and name as `store.db`. We first query the database using a custom class CustomSQL, imported from a custom library which will be explained later. Here we use an oversimplified approach to store all the information about all the products that our company will be selling. This is done by manually passing SQL queries to create tables such as `products`, which stores the name, price, image source hyperlink (stored as text to access, via the same folder, the saved images) and description etc of all the products, followed by inserting each product as a data entry into the table with all its corresponding properties. Here we also create tables `transactions`, `transacted_items`, `users` and `savedcart`, which will all be explained in further detail later.

After that we configure the flask sessions and ensure the responses are not cached to ensure validation of form resubmission, which will be important later especially for the submission of sensitive data. Now that our basic functionalities are completed, we can move on to explore each of the `app.route` functions.

NAVBAR FUNCTIONS

/search

The search function is part of the navbar search to allow quick finding of products using `jsonify` autocompletion. Users only need to type in a character or a few letters into the search bar and the program would output a list of the relevant products whose names contain these characters.

PAGE FUNCTIONS

/index

Self-explanatory. This function renders the index (home) page of the company's website. The database is queried to return a list of dictionaries each of which contains all the information about a specific product, which is then passed to be displayed in the jinja template.

/product

This function returns the corresponding individual product page via any clicking of any link with the respective product name. Eg if the user clicks on a link that says *Chocolate Cookies*, they will have actually submitted a form which posts the product id of *Chocolate Cookies* to this function. This function can then get this product id and query the database for the data entry corresponding to this unique product id.

/favs and /seasonal

Similar to /index, these two functions display all the products but with the relevant tags as indicated in the database.

/about

Displays the about page of the company.

LOGIN FUNCTIONS

/profile

Renders the profile page of the user currently logged in, referencing session["user_id"]. If no user is logged in currently, redirects to the login page via the `@login_required` decorator.

/login

When retrieved via GET, displays a form to allow users to sign in or sign up. When the form is submitted via POST, first checks if username and password are valid, returning error flash messages if not, then logs user in via saving the user id to session["user_id"] and then redirecting back to the profile page via /profile. ***On successful login, the carts are addition-synced. This means that all the products previously saved to the user's profile and stored in the database will first be added to the cart as a base amount, and then any products which the user just added in the current session prior to logging in will then be added on top of this new base amount.*** As an example, if the user originally logged in with an empty cart (i.e. the user did not add any item to cart prior to logging in), any item that the user then adds to cart after logging in will also be saved to the database. This item quantity will remain in the current session even after the user logs out. On a second login without clearing the current cart, all the items in the current session will also be added to the saved cart in the database, resulting in a duplicated qty of items both in the current cart and in the database.

> [!CAUTION]
> This results in a duplicate amount being saved to cart (this is also displayed in the current session). Users are advised to clear their carts after logging out if they intend to log in again.

The intended purpose is to allow continuous seamless shopping when the user originally did not sign in but later wishes to access their previously saved choices (saved to their profile) together with the items they just added to cart in this session (not saved to their profile). This allows the user to checkout quickly even if they added their items over multiple sessions.

To illustrate this more clearly, let's say a new user Alice first visits our website. Before even browsing any products, she decides to sign up for a new account. After successfully logging in to her new profile, she decides to add a chocolate cookie and a strawberry cookie to her cart. She then logs out accidentally. She views her current cart after logging out; it still displays a chocolate cookie and a strawberry cookie as expected. Now she logs back in to the same account, and views her cart again. To her surprise, she now sees two chocolate cookies and two strawberry cookies in her new cart. This is because the items previously saved to her profile are now added to the current cart in session, resulting in a duplicate. If she had cleared her cart before logging in instead, she would only have had her original instance of one chocolate cookie and one strawberry cookie, as was saved to her profile in the database.

/logout

Clears the current `session["user_id"]` allowing users to log out. Redirects back to the login page via /profile.

/register

When retrieved via GET, renders a sign up page with password confirmation. When submitted via POST, ensures validity of username and password, then logs users in. *As this is a new account, no cart syncing is required.*

CART FUNCTIONS

/cart
Driver function for adding and displaying items in current `cart["session"]`. Prior to any action, ensure the cart is in session.

When this function is executed via POST, i.e. when the user adds the item to cart from the individual product page, get the product id and input quantity which must be a positive integer > 0. If the item is not yet in cart, add it as a `Cookie` object (explained in `cookie.py`) with the relevant properties. If it is already in cart, update its quantity. If the user is signed in, also add to the database. Flash successfully added to cart message. If none of the buttons are clicked, remains on the product page.

When this function is retrieved via GET, i.e. when the user clicks on the cart icon in the navbar or the View Cart button in the flash messages, displays all items in cart. Calculates the total cost of the products (without any discount) and saves it in `session["grandtotal"]`. If the cart is empty, renders the `emptycart.html` instead, to prevent the user from checking out without any item.

/editcart

This function allows users to individually amend the quantity of each product in the cart. When a product quantity is incremented, the function works exactly like the /cart function. However when the quantity is decremented, if the product quantity is changed to 0, the product is automatically removed from `session["cart"]` and deleted from the database.

sync_carts("a"/"w"/"r")

This is an oversimplified function to allow saving to and reading from database. When "a" (add/append) is called, only adds all item quantities from `session["cart"]` into the database using the current user id. When "w" (write/overwrite) is called, updates and overwrites all item quantities from `session["cart"]` into the database using the current user id. This effectively replaces all previous data entries into the database via the current user id.

To ensure the data input is accurate, we clear the current `session["cart"]`, and then read all the data from the database with the current user id back into `session["cart"]` via the "r" (read) input operation.

CHECKOUT FUNCTIONS

/checkout

When retrieved via GET, i.e. when a user clicks on the checkout button in cart, displays a form allowing users to fill in their personal particulars and delivery and payment details. ***For the simplicity of this project, the payment details are saved as data in the database (though this is not done in practice, of course, in the real world) and hence will be susceptible to attacks and security breaches, with no way to validate account balances or allow actual monetary transfer.*** When executed via POST, i.e. when user fills in the form and submits it on payment, saves all details to the `transactions` and `transacted_items` tables, clears all current sessions via clear_session(), and renders the receipt page.

/giftcode

Allows the application of gift code for discount. This is implemented as a function that retrieves the relevant code and applies the corresponding discount or returns an error message otherwise. Returns `session["discounted"]` as a discounted calculation of `session["grandtotal"]` and `session["gift_code_status"]` to display success or error message.

clear_session()

When the user checkouts, deletes all items saved to the user's profile and then clears all sessions.

#### ${\textsf{\color{YellowGreen}{helper-functions.py}}}$
login_required()

Decorator function that ensures user is logged in before allowing access to the decorated function, else redirects them to login. Used in /profile to allow users to sign in to access their personal profile.

usd()

Simple format function to format floats into USD values. Customised as a filter in app.py to allow use in jinja template.

#### ${\textsf{\color{YellowGreen}{cookie.py}}}$
Cookie()

A custom class storing all information about each product using getter and setter functions, as retrieved from the `products` table in the database. The __str__ method is only for debugging purposes.

#### ${\textsf{\color{YellowGreen}{customsql.py}}}$
CustomSQL()

A custom class to abstract passing SQL queries into the database. If the query starts with `"SELECT"`, returns the result as a list of dictionaries zipped with the keys as the table headers and the values as the corresponding data entries.

#### ${\textsf{\color{YellowGreen}{layout.html}}}$
The base layout for all the templates in this project. Defines meta properties and links to relevant stylesheet, favicon, and script as well as page titles in the head. Defines header for brand logo, nav for navbar, main for page body, flash message alerts, and footer in body.

HEADER

The header displays a welcoming message and the brand logo at the top of the page. On hover, the welcome message changes to a hidden message with redemption code for users to apply and enjoy discounts. Meanwhile, the brand logo allows users to click on it to be brought back to the home page from whichever page they are currently on.

THE NAVBAR

The navbar comprises links to various webpages, a search bar with search button, a profile icon, and a cart icon. The first item in the navbar is also a dropdown alongside being a link. On hover, it displays a list of other links for easy navigation to the respective webpages. The search bar is powered by jsonify in the /search function as explained earlier, and on input displays a list of links which on click brings the user to the corresponding product page. The profile icon leads the user to login to view their profile, via /login and /profile, or sign up for a new account via /register. The cart icon leads users to the cart page where users can then view and edit the cart items and their respective quantities as they wish.

FLASH MESSAGES BY CATEGORY

As different types of flash messages serve different purposes we have sorted them by category namely "success", "error", and "alert". "Success" messages are displayed when the user successfully logs in to their profile or adds an item to cart, with buttons allowing users to close the alert (users can click on the red cross at the upper right hand corner of the alert box or click anywhere on the screen), go back to the home page, or to view their cart. "Error" messages pop up when invalid actions are executed by the user, e.g. not inputting the right username or password when logging in. "Alert" messages alert the user on successful completion of certain actions, e.g. successful payment on checkout.

FOOTER

The footer displays a certain set of links for easy navigation at the bottom of the page. For the purpose of this project, however, only the link to the about page has been implemented for simplicity sake.

#### ${\textsf{\color{YellowGreen}{grid.html}}}$
This layout is also an extension of `layout.html` which serves as a secondary layer for pages to display multiple products in a table format on the same page.

#### ${\textsf{\color{YellowGreen}{index.html}}}$
This is the homepage of the website, and shows all the products the company sells. Each product is displayed as a grid item and on click leads the user to the respective individual product page.

#### ${\textsf{\color{YellowGreen}{product.html}}}$
This is another extension of `layout.html` which serves as a template for any product given its product id and other details. This allows the same layout to be used for multiple products without the need for multiple individual pages to be created for each product.

#### ${\textsf{\color{YellowGreen}{favs.html and seasonal.html}}}$
These pages display products of their respective categories based on the data entered into the database. Similar to `index.html`, they also extend `grid.html` to use the grid layout to display their products.

#### ${\textsf{\color{YellowGreen}{about.html}}}$
A simple about page to describe the company.

#### ${\textsf{\color{YellowGreen}{profile.html}}}$
Allows users to view their profile or log out as required.

#### ${\textsf{\color{YellowGreen}{login.html}}}$
Allows users to login or sign up for a new account.

#### ${\textsf{\color{YellowGreen}{register.html}}}$
Allows users to register for a new account.

#### ${\textsf{\color{YellowGreen}{cart.html}}}$
This is another template extending `layout.html` that serves as the basis for the following two pages.

#### ${\textsf{\color{YellowGreen}{emptycart.html}}}$
Displays a message prompting users that the cart is empty and directs users to browse products to add to cart. Prevents users from checking out without any item in cart with $0 total cost.

#### ${\textsf{\color{YellowGreen}{fullcart.html}}}$
When an item is added to cart, it will be displayed in a table format here, along with the total cost. Allows users to edit cart items here and checkout when done.

#### ${\textsf{\color{YellowGreen}{checkout.html}}}$
Displays a form for users to fill in personal particulars and delivery and payment details, along with a summary of all products in cart. (See /checkout above for more details)

#### ${\textsf{\color{YellowGreen}{receipt.html}}}$
Returns a commercial receipt of transaction including products bought and customer details, and some other details of the transaction. Allows users to print the receipt page with a print button at the bottom.

#### ${\textsf{\color{YellowGreen}{script.js}}}$
overlay_off()

When the flash alert message is clicked anywhere on the screen, or the red cross on the upper right hand corner of the alert box is clicked, closes the flash alert box and simultaneously removes the dark overlay. This is because the alert box is under the overlay <div> as well.

search()

Implements the search function in /search using jsonify. Returns, in HTML, a list of block links (buttons) as part of a form to direct users to the respective products searched for.

#### ${\textsf{\color{YellowGreen}{styles.css}}}$
The main stylesheet that dictates the design principles behind the template items.

Much time and effort was put into designing each element to make them fit better into the page, albeit not supported for mobile viewing, but at least allowing zooming in and out on a PC screen. Each element was painstakingly manually transformed and styled to appeal to the general user (less the number input style, with which credit I have mentioned in the document itself)

### ${\textsf{\color{YellowOrange}{Did I debate certain design choices and why I made them?}}}$

NUMBER INPUT STYLE

To better allow editing item quantity, I chose to use the button style for all number inputs when adding items to cart or editting cart item quantities. As I was inexperienced with such designed principles, I went online to research for a way to implement this, and adapted a ready-made solution to my project (credit: https://stackoverflow.com/questions/45396280/customizing-increment-arrows-on-input-of-type-number-using-css). This allows for more user-friendly number inputs.

DIFFERENT LAYOUT FOR CHECKOUT AND RECEIPT PAGES

The checkout and receipt pages have slightly different layouts from their counterparts due to the simplicity required of their functionalities. Only allows navigation back to the home page to prevent caching of responses due to sensitive details being input in the checkout page.

OTHERS

The rest of the design choices have already been mentioned in their respective sections above in their corresponding functions.

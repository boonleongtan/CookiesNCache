a_create_table_for_products = '''
    CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price REAL NOT NULL, img TEXT, desc TEXT, fav TEXT, seasonal TEXT);
'''

b_input_products_into_table = '''
    INSERT INTO products(name, price, img, desc, fav, seasonal)
    VALUES('Chocolate Cookies', 6.70, '/static/choco_cookie.jpg', 'Juicy chocolate with sweet and spicy tastes, beautiful and amazing, wonderfully rich fragrance. Bite into a whole new world of creamy chocolatey delight as you give your tastebuds a well-deserved treat.', 'no', 'no'),
    ('Strawberry Cookies', 13.30, '/static/strawberry_cookie.jpg', 'Beautifully rich aroma.', 'yes', 'yes'),
    ('Thumbdrive', 5.00, '/static/thumbdrive_cookie.jpg', 'Crunchy and flavourful data.', 'yes', 'no'),
    ('Durian', 7.77, '/static/durian_cookie.png', 'Stinky.', 'yes', 'no'),
    ('Keyboard', 27.90, NULL, NULL, NULL, NULL)
    ON CONFLICT(name) DO UPDATE SET price=excluded.price, img=excluded.img, desc=excluded.desc, fav=excluded.fav, seasonal=excluded.seasonal;
'''

c_create_table_for_transaction_details = '''
    CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone_no TEXT NOT NULL, country TEXT NOT NULL, address TEXT NOT NULL, postal_code TEXT NOT NULL, delivery_datetime BLOB NOT NULL, card_no TEXT NOT NULL, card_exp TEXT NOT NULL, card_code TEXT NOT NULL, card_name TEXT NOT NULL, prediscount_amt REAL NOT NULL, transacted_amt REAL NOT NULL, transaction_datetime TEXT NOT NULL);
'''

d_create_table_for_transacted_items = '''
    CREATE TABLE IF NOT EXISTS transacted_items(transaction_id INTEGER NOT NULL, item_name TEXT NOT NULL, item_price REAL NOT NULL, item_qty INTEGER NOT NULL, FOREIGN KEY(transaction_id) REFERENCES transactions(id));
'''

e_create_table_for_users = '''
    CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, hash TEXT NOT NULL);
'''

f_create_table_for_users_saved_cart = '''
    CREATE TABLE IF NOT EXISTS savedcart(user_id INTEGER NOT NULL, product_id INTEGER NOT NULL UNIQUE, qty INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(product_id) REFERENCES products(id));
'''
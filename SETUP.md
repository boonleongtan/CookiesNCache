# Setting up to run React-Flask

First `cd` into `react-flask` dir.

## Server (Flask)

${\textsf{\color{Orange}{1:}}}$ Open `flask-api` in Integrated Terminal.

${\textsf{\color{Orange}{2:}}}$ **Both** Linux and Windows:

```
python3 -m venv venv
```

${\textsf{\color{Orange}{3:}}}$ **Linux:**

```
. venv/bin/activate
```

or **(also Linux):**

```
source venv/bin/activate
```

**Windows:**

```
venv\Scripts\activate
```

${\textsf{\color{Orange}{4:}}}$ Install libraries (both)

```
pip install flask flask-session python-dotenv
```

*(Optional):*

```
pip install werkzeug
```

## Client (React)

${\textsf{\color{Pink}{1:}}}$ Open `react-client` in Integrated Terminal

${\textsf{\color{Pink}{2:}}}$ Install node_modules

```
npm i
```

or

```
npm install
```

# ${\textsf{\color{YellowGreen}{Running}}}$

${\textsf{\color{YellowGreen}{1:}}}$ First change `... "scripts": {...} ...` in `package.json` to match OS:

**Linux:**

```
"start-api": "cd ../flask-api && venv/bin/flask run --no-debugger",
```

**Windows:**

```
"start-api": "cd ../flask-api && venv\\Scripts\\activate && flask run --no-debugger",
```

${\textsf{\color{YellowGreen}{2:}}}$ Then, Open 2 x `react-client` in Integrated Terminal.

${\textsf{\color{YellowGreen}{3:}}}$ In each terminal, run:

### Server (Flask)

```
npm run start-api
```

and

### Client (React)

```
npm start
```
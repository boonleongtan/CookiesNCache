# Setting up to run React-Flask

First `cd` into `react-flask` dir. This will be the main working directory.

## Server (Flask)

${\textsf{\color{Orange}{1:}}}$ Open `flask-api` dir in Integrated Terminal.

${\textsf{\color{Orange}{2:}}}$ Create a python venv.

- **Linux/Windows**:

```shell
python3 -m venv venv
```

${\textsf{\color{Orange}{3:}}}$ Activate the venv.

- **Windows:**

```powershell
venv\Scripts\activate
```

- **Linux:**

```bash
. venv/bin/activate
# or
source venv/bin/activate
```

${\textsf{\color{Orange}{4:}}}$ Install libraries (both).

```shell
# if uv installed
uv pip install -r requirements.txt
```

*or manually install individually:*

```shell
pip install flask flask-session python-dotenv
pip install werkzeug # optional
```

## Client (React)

${\textsf{\color{Pink}{1:}}}$ Open `react-client` dir in Integrated Terminal.

${\textsf{\color{Pink}{2:}}}$ Install node_modules. Make sure yarn is installed.

```shell
npm install -g yarn
yarn i
```

>[!WARNING]
> The following command uses package-lock.json and has been deprecated:
```shell
npm i
# or
npm install
```

# ${\textsf{\color{YellowGreen}{Running}}}$

${\textsf{\color{YellowGreen}{1:}}}$ First change `"scripts": {...}` in `package.json` to ${\textsf{\color{YellowGreen}{match OS}}}$:

**Windows:**

```json
"start-api": "cd ../flask-api && venv\\Scripts\\activate && flask run --no-debugger",
```

**Linux:**

```json
"start-api": "cd ../flask-api && venv/bin/flask run --no-debugger",
```

${\textsf{\color{YellowGreen}{2:}}}$ Then, Open 2 x `react-client` dir in Integrated Terminal.

${\textsf{\color{YellowGreen}{3:}}}$ In each terminal, run:

### Server (Flask)

```shell
yarn run start-api
```

>[!WARNING]
>Deprecated
```shell
npm run start-api
```

and

### Client (React)

```shell
yarn start
```

>[!WARNING]
>Deprecated
```shell
npm start
```
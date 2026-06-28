# Setting up React-Flask locally

Run the Flask API and Vite React client in separate terminals.

## Server: Flask API

From the repository root:

```powershell
cd react-flask/flask-api
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python -m flask --app api run --no-debugger
```

The API runs at `http://127.0.0.1:5000`.

## Client: React + Vite

In a second terminal:

```powershell
cd react-flask/react-client
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

The Vite dev server proxies `/api` requests to Flask, so the React code can keep using relative API URLs such as `/api/products`.

## Security maintenance

```powershell
cd react-flask/react-client
npm audit
```

```powershell
cd react-flask/flask-api
python -m pip install pip-audit
pip-audit -r requirements.txt
```

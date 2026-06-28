# Cookies & Cache React Client

This client runs on Vite and proxies API requests to the Flask server in `../flask-api`.

## Run locally

Start the API first:

```powershell
cd ../flask-api
venv\Scripts\activate
python -m flask --app api run --no-debugger
```

Then start the client:

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Useful commands

```powershell
npm run build
npm run preview
npm audit
```

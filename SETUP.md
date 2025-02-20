# Setting up to run React-Flask

First `cd` into `react-flask` dir.

## Server (Flask)

1: Open `flask-api` in Integrated Terminal

2: **Both:**

```
python3 -m venv venv
```

3:

**Linux:**

```
. venv/bin/activate
```

or

```
source venv/bin/activate
```

**Windows:**

```
venv\Scripts\activate
```

## Client (React)

1: Open `react-client` in Integrated Terminal

2:

```
npm i
```

or

```
npm install
```

# Running

First Open 2 x `react-client` in Integrated Terminal

### Server (Flask)
```
npm run start-api
```
### Client (React)
```
npm start
```
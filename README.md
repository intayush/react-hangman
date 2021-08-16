# React Hangman Client

This project is live on (https://hmreact.herokuapp.com/). The first load may take time as heroku server dyno goes in sleep mode if not accessed for 30 minutes.

## Running project in development mode

### Pre-requisites:

1. node version `14.x`
2. yarn version `1.22.x`

In the project directory, you can run:

### Steps:

1. Run `yarn`. To install all dependencies.

2. Run `yarn test`. This launches the test runner in the interactive watch mode.

3. Run `yarn start`. This will run the app in the development mode. Open (http://localhost:3000) to view it in the browser.

### Run with local hangman node server APIs

By defualt the app uses the public node server APIs hosted on (https://hmreact.herokuapp.com/).

1. In the package.json file change the `proxy` to http://localhost:PORT/ (your node server path).


### Deploying react build on node server

1. Run `yarn build`. builds the app for production to the `build` folder.
2. Copy the `build` folder and replace it in node-hangman installation directory.
3. Restart node server to see the changes.

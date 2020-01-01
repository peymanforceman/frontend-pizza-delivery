# Frontend Project for Online Pizza Delivery App
Pizza Online ordering platform made by Vue.js and Vuex. 
This is a technical challenge for `innoscripta.com`

Description : This project includes the Frontend of a pizza online ordering service.

The project made by Vue.js & Javascript

The project includes the following features:

- Show A List of Available Categories and Products
- User Register / Login / Logout
- User Order Pizza
- User Check Order
- User Previous Orders History
- Refreshing the page in all parts is available

More info : I used localstorage to save user cart and access token.
In a production env , I recommend saving access token as a secure cookie but for this project to speed up we used just localstorage to save access token.

## Project setup
```
yarn install
```
Edit `src/main.js` and set `axios.defaults.baseURL` to your Backend URL.
### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

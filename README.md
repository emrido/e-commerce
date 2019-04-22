# e-commerce

## Routes
List of user routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/users/register` | POST | `none` | name: String (**Required**), email: String (**Required**), password: String (**Required**) | Create a user |
| `/users/login` | POST | `none` | email: String (**Required**), password: String (**Required**) | Login user |


List of basic routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/products` | POST | `none` | name: String (**Required**) ,<br> price: Number(**Required**) ,<br>  image: File(**Required**) ,<br> stock: Number(**Required**) ,<br> Description: String(**Required**)| Post a Product |
| `/products` | GET | `none` | `none` | Get all Products|
| `/products/:id` | DELETE | `none` | `none`|  Delete Product |
| `/cart` | POST | `access_token` | `none`|  Create a new cart |
| `/cart/:id` | GET | `access_token` | `none`|  Get Cart |
| `/cart/addItem/:id/` | PUT | `access_token` | `none`|  Add new product to cart |
| `/cart/removeItem/:id` | PUT | `access_token` | `none`|  Remove product from cart |

## Usage

Run this command: 

Server:
```
$ npm install
$ npm run dev
```
Client:
 
```
$ npm install
$ npm run serve
```

## Access point:
Server: http://localhost:3000

Client: http://localhost:8080
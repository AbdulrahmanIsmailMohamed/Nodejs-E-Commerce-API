<!-- PROJECT LOGO -->
<br />
<h1 align="center">
  <a href="https://github.com/AbdulrahmanIsmailMohamed/Nodejs-E-Commerce-API">
    <img src="https://hackernoon.com/hn-images/1*lAR9Uh_gJ7dp23e0vhy5Hg.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Node.js Ecommerce API</h3>
</h1>

<h4 align="center">Ecommerce API built using NodeJS & Express & MongoDB</h4>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#deployed-version">Demo</a>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#api-usage">API Usage</a>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
    </li>
    <li>
      <a href="#build-with">Build With</a>
    </li>
    <li>
      <a href="#plans">Plans</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#known-bugs">Known Bugs</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>

  </ol>
</details>

## Deployed Version

Live demo (Feel free to visit) 👉 :  <a href="nodejs-e-commerce-api.cyclic.app/">Node.js E-commerce Api </a>

## Key Features

* Authentication
  * Login [Public]
  * SignUp [Public]
  * Tokens [User]
* Password Management
  * Change Password [User]
  * Forgot Password [Public]
  * Reset Password  [Public]
* Email Management
  * Send the verification code to change the password [Public]
* User
  * Create New User [Admin]
  * Get All Users [Amin]
  * Get User Data Using It's ID [Admin]
  * Update User Profile Image Using It's ID [User]
  * Inactive my account [user]
* Cart Services
  * Add Product To Cart [User]
  * Reduce Product Quantity By One [User]
  * Increase Product Quantity By One [User]
  * Get Cart [User]
  * Delete Cart Item [User]
  * Delete Cart [User]
  * Apply Coupon [User]
* Review Services
  * Create New Review [User]
  * Query All Reviews [Public]
  * Query Review Using It's ID [Public]
  * Update Review Using It's ID [User]
  * Delete Review Using It's ID [User, Admin]
* Product Services
  * Query products [Public]
  * Query Product Using It's ID [Public]
  * Create new product [Admin]
  * Update Product Details [Admin]
  * Update Product Main Image [Admin]
  * Update Product Images [Admin]
  * Delete Product Using It's ID [Admin]
* Wishlist Services
  * Get Wishlist Products List [User]
  * Add Product to Wishlist [User]
  * Delete Product From Wishlist List [User]
* Discount Services
  * Generate Discount Code [Admin]
  * Get Dicount Amount [User]
  * Get All Discount Codes [Admin]
  * Update Discount Code [Admin]
  * Verify Discount Code [User]
  * Delete Discount Code [Admin]
  * Cancel Discount Code [User]
* Order Services
  * Create New Order [User]
  * Query Orders [User, Admin]
  * Query Order Using It's ID [User, Aadmin]
  * Cancel Order [User]
  * Update Order Status To Paid [Admin]
  * Update Order Status To Delivere [Admin]
  * Create Checkout Session [User]
* Category Services
  * Create Category [Admin]
  * Create Category Image [Admin]
  * Query Categories [Public]
  * Query Category Using It's ID [Public]
  * Update Category Details [Admin]
  * Update Category Image [Admin]
  * Delete Category [Admin]
  * Get SubCategory By Category Id [Public]
* Sub-Category
  * Create Sub-Category [Admin]
  * Query Sub-Categories [Public]
  * Query Sub-Category Using It's ID [Public]
  * Update Sub-Category Details [Admin]
  * Delete Sub-Category [Admin]
* Brand
  * Create Brand [Admin]
  * Upload Image Brand [Admin]
  * Query Brands [Public]
  * Update Brand [Admin]
  * Update Image Brand [Admin]
  * Delete Brand [Admin]
  * Get Brand Using It's Id [Public]
* Address
  * Create Address [User]
  * Get Logged User Addresses [User]
  * Delete Address [User]
  
## API Usage

Check [Ecommerce API Documentation]() for more info.

## Deployment

The API is deployed with git into Cyclic. Below are the steps taken:

```
git init
git add -A
git commit -m "Commit message"
```

## Built With

List of any major frameworks used to build the project.

* [NodeJS](https://nodejs.org/) - JS runtime environment
* [ExpressJS](https://expressjs.com/) - The NodeJS framework used
* [MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Encryption & Decryption Algorithm
* [Compression](https://www.npmjs.com/package/compression) - NodeJS compression middleware
* [Cors](https://www.npmjs.com/package/cors) - NodeJS package for providing a Connect/Express middleware that can be used to enable CORS with various options
* [Express Mongo Sanitize](https://www.npmjs.com/package/express-mongo-sanitize) - Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
* [Slugify](https://www.npmjs.com/package/slugify) - Slugifies a string
* [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env
* [Rate Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic IP rate-limiting middleware for Express
* [Helmet](https://www.npmjs.com/package/helmet) - Secure Express apps by setting various HTTP headers
* [JWT](https://jwt.io/) - Compact URL-safe means of representing claims to be transferred between two parties
* [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for NodeJS
* [Multer](https://www.npmjs.com/package/multer) - NodeJS middleware for handling multipart/form-data
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Easy as cake e-mail sending from your Node.js applications
* [Express-Validator](https://www.npmjs.com/package/express-validator) - A library of string validators and sanitizers.
* [Winston](https://www.npmjs.com/package/winston) - A logger for just about everything.
* [XSS Clean](https://www.npmjs.com/package/xss-clean) - Middleware to sanitize user input
* [Stripe](https://www.npmjs.com/package/stripe) - The Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.

## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```
$ npm install
set your env variables
$ npm run start:dev
``` 

## Known Bugs
Feel free to email me at abdulrahman.ismail.mohammed@gmail.com if you run into any issues or have questions, ideas or concerns.n into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

<!-- CONTACT -->
## Contact

Email - [abdulrahman.ismail.mohammed@gmail.com]

Project: [https://github.com/AbdulrahmanIsmailMohamed/Nodejs-E-Commerce-API](https://github.com/AbdulrahmanIsmailMohamed/Nodejs-E-Commerce-API)

# Validation Test
This is a project designed into a two-part system which consist in the back-end API and the front-end APP. The application is a tool for you to validate different types of input of a credit card sent by the end-user.

The API holds a single POST endpoint
* http://localhost:8000/api/v1/payment

This enpoint will validate:

* Card number is only between 16 and 19  characters long.
* Card number can't send non-digits characters into the API.
* Expiration date is a date in the future.
* Security number is 3-digits only (4-digits for AMEX cards).
* Card holder can't be special characters or digits.

## Requirements
For the API you will require to have:
* php 8.2^
* composer 2.5^

Keep in mind that in order to run a Laravel application you will also need to install some php extensions running this command.

```
sudo apt install openssl php-bcmath php-curl php-json php-mbstring php-mysql php-tokenizer php-xml php-zip
```

For the Front-End you also need:
* npm 9.6^

Once installed you can check the version of the package doing.

```
<package> --version
```
## Installation
First we will need to clone the project.
```
git clone git@github.com:RodSoriano/validation-test.git
```
Once clone go into the backend-api directory.
```
cd validation-test/backend-api
```
In here we will need to install the Laravel project using composer.
```
composer install
```

Now we have installed the backend-api, we will continue to install the front-end side.

From where we are we go into the root directoy doing.
```
cd ..
```
Now we go into the frontend-app folder.
```
cd frontend-app
```
Here we install the application using npm.
```
npm install
```
Now we have install our whole application.

## Live Test
In order to run and try our application we can use the the development servers integrated within each side of the application.

First go into the "backend-api" directory, once in there you run.
```
php artisan serve
```
Our API is now running on http://localhost:8000

Then we need to go into our "frontend-app" directory, once in there you run.
```
npm run dev
```
Once done our front-end is running on http://localhost:5173

Now you can try the application.

If you have any questions, feedback or suggestions please feel free to contact me.
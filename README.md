# Validation Test
This is a project designed as a two-part system consisting of the back-end API and the front-end APP. The application is a tool for you to validate different types of input of a credit card sent by the end-user.

The API has a single POST endpoint.
* http://localhost:8000/api/v1/payment

This enpoint will validate:

* Card number is only between 16 and 19  characters long.
* Card number can't send non-digits characters into the API.
* Expiration date is a date in the future.
* Security number is 3-digits only (4-digits for AMEX cards).
* Card holder can't be special characters or digits.

## Requirements
For the API, you will require to have:
* php 8.2^
* composer 2.5^

Keep in mind that in order to run a Laravel application, you will also need to install some PHP extensions by running this command.

```
sudo apt install openssl php-bcmath php-curl php-json php-mbstring php-mysql php-tokenizer php-xml php-zip
```
New PHP versions come with some extensions integrated within the core package. If you encounter any errors during the project installation, such as "missing extension," please check your "php.ini" configuration file. In the "php.ini" file, search for the keyword "extension" and look for the extensions you need. Uncomment them, and you will be ready to proceed. If you are using Windows, another option is to download the DLL file from the official PHP website. Here you can find instructions with more details for installation (As an example here we are installing the "zip" extension).
https://www.php.net/manual/en/zip.installation.php

For the Front-End you also need:
* npm 9.6^

Once installed you can check the version of the package by doing.

```
<package> --version
```
## Installation
First we will need to clone the project.
```
git clone https://github.com/RodSoriano/validation-test.git
```
Once done, go into the backend-api directory.
```
cd validation-test/backend-api
```
Here, we will need to install the Laravel project using composer.
```
composer install
```

Now we have installed the backend-api, we will continue with the front-end side.

From where we are, we go into the root directory doing.
```
cd ..
```
Now we go into the frontend-app folder.
```
cd frontend-app
```
Here, we install the application using npm.
```
npm install
```
Now our whole application has been installed.

## Live Test
In order to run and try our application we can use the development server integrated within each side of the application.

First, go into the "backend-api" directory, once in there you run.
```
php artisan serve
```
Our API is now running on http://localhost:8000

Then we need to go into our "frontend-app" directory, once in there you run.
```
npm run dev
```
Our front-end is now running on http://localhost:5173

Now you can try the application.

# Validation Test
This is a project designed into a two-part system which consist in the back-end API and the front-end APP. The application is a tool for you to validate different types of input of a credit card sent by the end-user.

You can validate:

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

Once installed on Ubuntu you can check the version of the package doing.

```
<package> --version
```

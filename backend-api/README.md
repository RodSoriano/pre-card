# Structure
Laravel comes with a lot of different features, however in this folder structure I will only mention the structure of the ones being used by the API.

```
|-app
|   |-http
|   |   |-controllers
|   |   |   |-api
|   |   |-requests
|   |
|   |-services
|       |-external
|-routes
|-tests
|   |-feature
```

## Workflow

The post request will enter into our "routes/api.php" file, here it will be sent to the payment controller however, first will be passed through our validation layer, Laravel's Form Request.

On this layer the data will be validated and checked in order to be sent to our payment API. Once the data has been validated we go into our controller, which passes the request to a service object which is the one to handle the payment, in this example it is simply called "PaymentApi" and here will be the end of the request.

Now that the request has been sent to the service, the service will respond back to the controller and the controller will display a json response being the end of our request-response cycle.

<?php

namespace App\Services\External;

class PaymentApi
{
    public function saveCard(array $payment): array
    {
        return ['message' => 'success'];
    }

    // Here we can use Guzzle HTTP Client
    // to make request to a different api
    // in order to send the payment info.

    // public function saveCardExample(array $requestBody): string
    // {
    //     $response = Http::post('http://payment-app.com/api/payment-token', $requestBody);
    //     $savedInfo =  Card::create($response->body());

    //     return $savedInfo;
    // }
}

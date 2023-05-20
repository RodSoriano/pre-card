<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCardPaymentRequest;
use App\Services\External\PaymentApi;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function create(CreateCardPaymentRequest $request, PaymentApi $ApiService): JsonResponse
    {
        $payment = $request->validated();

        $createdPayment = $ApiService->saveCard($payment);

        return response()->json(['data' => $createdPayment], 201);
    }
}

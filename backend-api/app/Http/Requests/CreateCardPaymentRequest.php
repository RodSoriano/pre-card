<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateCardPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $cvvLength = $this->cvvLength();

        return [
            "card_number" => ['required', 'not_regex:/[^0-9]/', 'string', 'min:16', 'max:19'],
            "expiration_date" => ['required', 'string'],
            "security_number" => ['required', 'string', "size:$cvvLength"],
            "card_holder" => ['required', 'not_regex:/[0-9!@#$%^&*_+-]/', 'string'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if (!$this->expirationDateValidate()) {
                    $validator->errors()->add(
                        'expiration_date',
                        'The expiration date field must be a date in the future or a valid date.'
                    );
                }
            }
        ];
    }

    private function cardType(): string
    {
        $startNumbers = substr($this->card_number, 0, 2);
        $cardType = '';

        match ($startNumbers) {
            '34', '37' => $cardType = 'AMEX',
            default => $cardType = 'OTHER'
        };

        return $cardType;
    }

    private function cvvLength(): int
    {
        $card = $this->cardType();
        $length = 0;

        match ($card) {
            'AMEX' => $length = 4,
            default => $length = 3
        };

        return $length;
    }

    private function expirationDateValidate(): bool
    {
        [$month, $year] = explode('/', date('m/y'), 2);
        [$inputMonth, $inputYear] = explode('/', $this->expiration_date, 2);
        $isValid = true;

        if ($inputMonth > 12) {
            $isValid = false;
        }

        if ($inputYear < $year) {
            $isValid = false;
        }

        if ($inputYear === $year) {
            if ($inputMonth <= $month) {
                $isValid = false;
            }
        }

        return $isValid;
    }
}

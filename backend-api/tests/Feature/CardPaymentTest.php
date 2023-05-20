<?php

namespace Tests\Feature;

use Tests\TestCase;

class CardPaymentTest extends TestCase
{
    /** @test
     *  @dataProvider cardValues
     */
    public function it_sends_credit_card_values(array $data): void
    {
        $response = $this->postJson(
            'http://www.localhost:8000/api/v1/payment',
            $data
        );

        $response->assertStatus(201);
    }

    public static function cardValues(): array
    {
        return [
            [
                [
                    'card_number' => fake()->creditCardNumber('Visa'),
                    'expiration_date' => '10/23',
                    'security_number' => (string) fake()->randomNumber(3, true),
                    'card_holder' => fake()->name(),
                ],
            ],
        ];
    }
}

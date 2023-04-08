<?php

namespace Database\Seeders;

use App\Models\Planos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $planos = [
            [
                'nome' => 'PLANO STATS',
                'valor' => '29.90',
            ],
            [
                'nome' => 'PLANO FANÁTICO',
                'valor' => '19.90',
            ],

        ];

        foreach ((array) $planos as $key => $val) :

            Planos::updateOrCreate(
                [
                    'nome' => $val['nome']
                ],
                [
                    'valor' => $val['valor'],
                ]
            );

        endforeach;
    }
}

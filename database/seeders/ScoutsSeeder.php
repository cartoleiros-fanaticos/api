<?php

namespace Database\Seeders;

use App\Models\Scouts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScoutsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $scouts = [
            [
                'sigla' => 'G',
                'nome' => 'Gol',
                'tipo' => 'Positivo',
                'valor' => 8,
            ],
            [
                'sigla' => 'A',
                'nome' => 'Assistência',
                'tipo' => 'Positivo',
                'valor' => 5,
            ],
            [
                'sigla' => 'FT',
                'nome' => 'F. na trave',
                'tipo' => 'Positivo',
                'valor' => 3,
            ],
            [
                'sigla' => 'FD',
                'nome' => 'F. defendida',
                'tipo' => 'Positivo',
                'valor' => 1.2,
            ],
            [
                'sigla' => 'FF',
                'nome' => 'F. para fora',
                'tipo' => 'Positivo',
                'valor' => 0.8,
            ],
            [
                'sigla' => 'GC',
                'nome' => 'Gol contra',
                'tipo' => 'Negativo',
                'valor' => -3,
            ],
            [
                'sigla' => 'DS',
                'nome' => 'Desarmes',
                'tipo' => 'Positivo',
                'valor' => 1.2,
            ],
            [
                'sigla' => 'FC',
                'nome' => 'Falta cometida',
                'tipo' => 'Negativo',
                'valor' => -0.3,
            ],
            [
                'sigla' => 'FS',
                'nome' => 'Falta sofrida',
                'tipo' => 'Positivo',
                'valor' => 0.5,
            ],
            [
                'sigla' => 'I',
                'nome' => 'Impedimento',
                'tipo' => 'Negativo',
                'valor' => -0.1,
            ],
            [
                'sigla' => 'CA',
                'nome' => 'Cartão amarelo',
                'tipo' => 'Negativo',
                'valor' => -1.0,
            ],
            [
                'sigla' => 'CV',
                'nome' => 'Cartão vermelho',
                'tipo' => 'Negativo',
                'valor' => -3.0,
            ],
            [
                'sigla' => 'SG',
                'nome' => 'Sem sofrer gol',
                'tipo' => 'Positivo',
                'valor' => 5,
            ],
            [
                'sigla' => 'DP',
                'nome' => 'Defesa pênalti',
                'tipo' => 'Positivo',
                'valor' => 7,
            ],
            [
                'sigla' => 'GS',
                'nome' => 'Gol sofrido',
                'tipo' => 'Negativo',
                'valor' => -1,
            ],
            [
                'sigla' => 'PP',
                'nome' => 'Pênalti perdido',
                'tipo' => 'Negativo',
                'valor' => -4,
            ],
            [
                'sigla' => 'PS',
                'nome' => 'Pênalti sofrido',
                'tipo' => 'Positivo',
                'valor' => 1,
            ],
            [
                'sigla' => 'PC',
                'nome' => 'Pênalti cometido',
                'tipo' => 'Negativo',
                'valor' => -1,
            ],
            [
                'sigla' => 'DE',
                'nome' => 'Defesas',
                'tipo' => 'Positivo',
                'valor' => 1,
            ],
            [
                'sigla' => 'V',
                'nome' => 'Vitória',
                'tipo' => 'Positivo',
                'valor' => 1,
            ],

        ];

        foreach ((array) $scouts as $key => $val) :

            Scouts::updateOrCreate(
                [
                    'nome' => $val['nome']
                ],
                [
                    'sigla' => $val['sigla'],
                    'tipo' => $val['tipo'],
                    'valor' => $val['valor'],
                ]
            );

        endforeach;
    }
}

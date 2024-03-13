<?php

namespace Database\Seeders;

use App\Models\Usuarios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuarios::updateOrCreate(
            [
                'email' => 'cartoleiros-fanaticos@outlook.com',
            ],
            [
                'nome' => 'Roberval Coelho',
                'celular' => '99981209872',
                'password' => Hash::make('bhGj4Y'),
                'funcao' => 'Admin',
                'plano' => 'Plano Fanático',
                'ativo' => 'Sim'
            ]
        );

        Usuarios::updateOrCreate(
            [
                'email' => 'wedson_cross@hotmail.com',
            ],
            [
                'nome' => 'Wedson Santos',
                'celular' => '82981761793',
                'password' => Hash::make('bhGj4Y'),
                'funcao' => 'Admin',
                'plano' => 'Plano Fanático',
                'ativo' => 'Sim'
            ]
        );
    }
}

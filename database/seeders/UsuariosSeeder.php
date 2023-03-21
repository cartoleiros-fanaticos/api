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
                'password' => Hash::make('admin'),
                'acesso' => 'Admin',
                'plano' => 'Premium Campeão',
                'ativo' => 'Sim'
            ]
        );
    }
}

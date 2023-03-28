<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Destaques extends Model
{
    use HasFactory;
    protected $fillable = [ 'atleta_id', 'rodada', 'apelido', 'posicao', 'foto', 'escalacoes', 'tipo' ];

    public function newQuery()
    {
        return parent::newQuery()
            ->where('temporada', Carbon::now()->format('Y'));
    }
}

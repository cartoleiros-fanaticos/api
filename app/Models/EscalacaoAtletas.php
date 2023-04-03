<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoAtletas extends Model
{
    use HasFactory;

    protected $fillable = ['atleta_id', 'preco_num', 'rodada_time_id', 'titular', 'escalacao_rodadas_id'];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }
}

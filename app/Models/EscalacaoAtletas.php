<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoAtletas extends Model
{
    use HasFactory;

    protected $fillable = ['atleta_id', 'temporada', 'preco_num', 'rodada_time_id', 'titular', 'entrou_em_campo', 'escalacao_rodadas_id'];

}

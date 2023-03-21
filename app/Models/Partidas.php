<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partidas extends Model
{
    use HasFactory;    
    protected $fillable = [ 'id', 'partida_id', 'rodada', 'clube_casa_id', 'clube_casa_posicao', 'clube_visitante_id', 'clube_visitante_posicao', 'partida_data', 'local', 'aproveitamento_casa_0', 'aproveitamento_casa_1', 'aproveitamento_casa_2', 'aproveitamento_casa_3', 'aproveitamento_casa_4', 'aproveitamento_fora_0', 'aproveitamento_fora_1', 'aproveitamento_fora_2', 'aproveitamento_fora_3', 'aproveitamento_fora_4', 'valida', 'placar_oficial_mandante', 'placar_oficial_visitante' ];

    public function newQuery()
    {
        return parent::newQuery()
            ->where('temporada', Carbon::now()->format('Y'));
    }
}

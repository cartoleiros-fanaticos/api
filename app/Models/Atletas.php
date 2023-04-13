<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atletas extends Model
{
    use HasFactory;
    protected $fillable = ['atleta_id', 'temporada', 'nome', 'slug', 'apelido', 'foto', 'rodada_id', 'clube_id', 'posicao_id', 'status_id', 'pontos_num', 'preco_num', 'variacao_num', 'media_num', 'jogos_num', 'minimo_para_valorizar', 'jogos_num', 'DS', 'FC', 'GC', 'CA', 'CV', 'SG', 'DP', 'GS', 'FS', 'A', 'FT', 'FD', 'FF', 'G', 'I', 'PP', 'PS', 'PC', 'DE'];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function clubes(){
        return $this->hasOne(Clubes::class, 'id', 'clube_id');
    }

    public function posicoes(){
        return $this->hasOne(Posicoes::class, 'id', 'posicao_id');
    }

    public function status(){
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function partidas(){
        return $this->hasOne(Partidas::class, 'rodada', 'rodada_id');
    }
}

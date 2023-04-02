<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoRodadas extends Model
{
    use HasFactory;

    protected $fillable = [ 'id', 'rodada_time_id', 'capitao_id', 'esquema', 'valor_time', 'pontuacao', 'escalacao_times_id' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function atletas(){
        return $this->hasMany(EscalacaoAtletas::class, 'escalacao_rodadas_id', 'id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoTimes extends Model
{
    use HasFactory;

    protected $fillable = [ 'id', 'temporada', 'nome', 'slug', 'patrimonio', 'time_id', 'pontos_campeonato', 'url_escudo_png', 'assinante' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function rodadas(){
        return $this->hasOne(EscalacaoRodadas::class, 'escalacao_times_id', 'id');
    }

}

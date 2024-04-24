<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoTimes extends Model
{
    use HasFactory;

    protected $fillable = [ 'id', 'temporada', 'nome', 'slug', 'patrimonio', 'time_id', 'pontos_campeonato', 'url_escudo_png', 'socio', 'access_token' ];

    protected $hidden = [
        'access_token'
    ];

    public function rodadas(){
        return $this->hasOne(EscalacaoRodadas::class, 'escalacao_times_id', 'id');
    }

}

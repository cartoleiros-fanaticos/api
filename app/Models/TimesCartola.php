<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesCartola extends Model
{
    use HasFactory;

    protected $fillable = [ 'id', 'temporada', 'nome', 'nome_cartola', 'slug', 'patrimonio', 'time_id', 'pontos_campeonato', 'facebook_id', 'foto_perfil', 'url_escudo_png', 'assinante' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function rodadas(){
        return $this->hasOne(TimesCartolaRodadas::class, 'times_cartolas_id', 'id');
    }
}

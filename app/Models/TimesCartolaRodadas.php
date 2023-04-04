<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesCartolaRodadas extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'rodada_time_id', 'capitao_id', 'esquema', 'valor_time', 'pontuacao', 'escalacao_times_id'];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }
}

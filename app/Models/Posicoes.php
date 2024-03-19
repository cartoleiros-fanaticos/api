<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posicoes extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'posicoes_id', 'temporada', 'nome', 'abreviacao' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }
}

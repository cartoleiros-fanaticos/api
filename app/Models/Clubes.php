<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clubes extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'clube_id', 'temporada', 'nome', 'abreviacao', 'escudo', '60x60', '45x45', '30x30' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }
}

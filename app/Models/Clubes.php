<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clubes extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'nome', 'abreviacao', 'escudo', '60x60', '45x45', '30x30' ];
}

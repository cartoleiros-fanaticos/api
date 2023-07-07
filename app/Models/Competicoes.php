<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Competicoes extends Model
{
    use HasFactory, SoftDeletes;

    public function posicoes(){
        return $this->hasMany(CompeticoesPosicoes::class, 'competicoes_id', 'id');
    }
}

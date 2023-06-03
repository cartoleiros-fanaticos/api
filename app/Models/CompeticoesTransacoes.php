<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompeticoesTransacoes extends Model
{
    use HasFactory, SoftDeletes;

    public function competicao(){
        return $this->belongsTo(Competicoes::class, 'competicoes_id', 'id');
    }

    public function time(){
        return $this->belongsTo(CompeticoesTimes::class, 'competicoes_times_id', 'id');
    }
}

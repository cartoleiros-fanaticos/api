<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompeticoesRodadas extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['rodada', 'competicoes_id', 'competicoes_times_id'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [ 'rodada_atual', 'status_mercado', 'game_over', 'times_escalados', 'temporada', 'fechamento' ];
}

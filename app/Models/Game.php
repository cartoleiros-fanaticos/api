<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [ 'rodada_atual', 'status_mercado', 'game_over', 'times_escalados', 'temporada', 'fechamento' ];

    public function newQuery()
    {
        return parent::newQuery()
            ->where('temporada', Carbon::now()->format('Y'));
    }
}

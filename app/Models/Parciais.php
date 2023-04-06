<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parciais extends Model
{
    use HasFactory;

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function clubes()
    {
        return $this->hasOne(Clubes::class, 'id', 'clube_id');
    }

    public function posicoes()
    {
        return $this->hasOne(Posicoes::class, 'id', 'posicao_id');
    }
}

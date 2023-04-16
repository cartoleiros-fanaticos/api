<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parciais extends Model
{
    use HasFactory;

    protected $fillable = ['rodada', 'clube_id', 'atleta_id', 'posicao_id', 'pontuacao', 'variacao_num', 'entrou_em_campo', 'DS', 'FC', 'GC', 'CA', 'CV', 'SG', 'DP', 'GS', 'FS', 'A', 'FT', 'FD', 'FF', 'G', 'I', 'PP', 'PS', 'PC', 'DE', 'V'];

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

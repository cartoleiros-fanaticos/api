<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesCartolaRodadas extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'rodada_time_id', 'capitao_id', 'esquema', 'valor_time', 'pontuacao', 'escalacao_times_id'];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function atletas()
    {
        return $this->hasMany(TimesCartolaAtletas::class, 'times_cartola_rodadas_id', 'id')
            ->select('times_cartola_rodadas_id', 'clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'posicao_id', 'atletas.preco_num', 'titular', 'foto')
            ->join('atletas', 'atletas.atleta_id', 'escalacao_atletas.atleta_id')
            ->join('clubes', 'clube_id', 'clubes.id')
            ->join('posicoes', 'posicao_id', 'posicoes.id')
            ->where('titular', 'Sim')
            ->orderBy('posicao_id');
    }

    public function reservas()
    {
        return $this->hasMany(TimesCartolaAtletas::class, 'times_cartola_rodadas_id', 'id')
            ->select('times_cartola_rodadas_id', 'clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'posicao_id', 'atletas.preco_num', 'titular', 'foto')
            ->join('atletas', 'atletas.atleta_id', 'escalacao_atletas.atleta_id')
            ->join('clubes', 'clube_id', 'clubes.id')
            ->join('posicoes', 'posicao_id', 'posicoes.id')
            ->where('titular', 'Não')
            ->orderBy('posicao_id');
    }
}

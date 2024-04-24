<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalacaoRodadas extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'temporada', 'rodada_time_id', 'capitao_id', 'esquema_id', 'valor_time', 'pontos', 'escalacao_times_id'];

    public function atletas()
    {
        return $this->hasMany(EscalacaoAtletas::class, 'escalacao_rodadas_id', 'id')
            ->select('escalacao_rodadas_id', 'atletas.clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'posicoes.posicao_id', 'atletas.preco_num', 'titular', 'foto', 'entrou_em_campo')
            ->join('atletas', function ($join) {

                $join->on('atletas.atleta_id', 'escalacao_atletas.atleta_id')
                    ->whereColumn('escalacao_atletas.temporada', 'atletas.temporada');
            })
            ->join('clubes', function ($join) {

                $join->on('atletas.clube_id', 'clubes.clube_id')
                    ->whereColumn('clubes.temporada', 'atletas.temporada');
            })
            ->join('posicoes', function ($join) {

                $join->on('atletas.posicao_id', 'posicoes.posicao_id')
                    ->whereColumn('posicoes.temporada', 'atletas.temporada');
            })
            ->where('titular', 'Sim')
            ->orderBy('posicoes.posicao_id');
    }

    public function reservas()
    {
        return $this->hasMany(EscalacaoAtletas::class, 'escalacao_rodadas_id', 'id')
            ->select('escalacao_rodadas_id', 'atletas.clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'posicoes.posicao_id', 'atletas.preco_num', 'titular', 'foto', 'entrou_em_campo')
            ->join('atletas', function ($join) {

                $join->on('atletas.atleta_id', 'escalacao_atletas.atleta_id')
                    ->whereColumn('escalacao_atletas.temporada', 'atletas.temporada');
            })
            ->join('clubes', function ($join) {

                $join->on('atletas.clube_id', 'clubes.clube_id')
                    ->whereColumn('clubes.temporada', 'atletas.temporada');
            })
            ->join('posicoes', function ($join) {

                $join->on('atletas.posicao_id', 'posicoes.posicao_id')
                    ->whereColumn('posicoes.temporada', 'atletas.temporada');
            })
            ->where('titular', 'Não')
            ->orderBy('posicoes.posicao_id');
    }
}

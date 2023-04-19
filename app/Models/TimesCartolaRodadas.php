<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesCartolaRodadas extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'rodada_time_id', 'capitao_id', 'esquema_id', 'valor_time', 'pontos', 'times_cartolas_id'];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }

    public function atletas()
    {
        return $this->hasMany(TimesCartolaAtletas::class, 'times_cartola_rodadas_id', 'id')
            ->select('times_cartola_rodadas_id', 'atletas.clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'atletas.apelido', 'atletas.posicao_id', 'atletas.preco_num', 'titular', 'atletas.foto', 'entrou_em_campo')
            ->join('atletas', 'atletas.atleta_id', 'times_cartola_atletas.atleta_id')
            ->join('clubes', 'atletas.clube_id', 'clubes.id')
            ->join('posicoes', 'atletas.posicao_id', 'posicoes.id')
            ->where('titular', 'Sim')
            ->orderBy('posicao_id');
    }

    public function reservas()
    {
        return $this->hasMany(TimesCartolaAtletas::class, 'times_cartola_rodadas_id', 'id')
            ->select('times_cartola_rodadas_id', 'atletas.clube_id', 'posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'atletas.apelido', 'atletas.posicao_id', 'atletas.preco_num', 'titular', 'atletas.foto', 'entrou_em_campo')
            ->join('atletas', 'atletas.atleta_id', 'times_cartola_atletas.atleta_id')
            ->join('clubes', 'atletas.clube_id', 'clubes.id')
            ->join('posicoes', 'atletas.posicao_id', 'posicoes.id')
            ->where('titular', 'Não')
            ->orderBy('posicao_id');
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Competicoes;
use App\Models\CompeticoesAtletas;
use App\Models\CompeticoesTimes;
use App\Models\Game;
use Illuminate\Console\Command;

class Competicao extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:competicao';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando que atualiza dados das ligas';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $game = Game::first();

        $game->status_mercado = 2;

        if ($game->status_mercado === 2) :

            CompeticoesAtletas::where('rodada', '!=', $game->rodada_atual)
                ->forceDelete();

            $times = CompeticoesTimes::select('time_id')
                ->join('competicoes_transacoes', 'competicoes_transacoes.competicoes_times_id', 'competicoes_transacoes.id')
                ->join('competicoes', 'competicoes_transacoes.competicoes_id', 'competicoes.id')
                ->where('competicoes_transacoes.situacao', 'Aceita')
                ->where('competicoes.situacao', 'Em andamento')
                ->groupBy('time_id')
                ->get();

            if(COLLECT($times)->count()):

                

            endif;

        endif;
    }
}

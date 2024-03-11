<?php

namespace App\Console\Commands;

use App\Models\Atletas;
use App\Models\Game;
use Illuminate\Console\Command;
use Carbon\Carbon;
use DB;

class SG extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sg';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando que atualiza os SG da tabela parcaisi.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $temporada = Carbon::now()->format('Y');

        $game = Game::where('temporada', $temporada)
            ->first();

        if ($game) :
            
            echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

            $atletas = Atletas::where('temporada', $temporada)
                ->get();

            echo '- Atualizando tabela parciais.' . PHP_EOL;

            foreach ($atletas as $key => $val) :

                $rodada = $game->game_over ? 38 : ($val->rodada - 1);

                DB::UPDATE('
                    UPDATE parciais SET SG = ? - SG
                    WHERE atleta_id = ? AND rodada = ? AND temporada = ?
                ', [$val->SG, $val->atleta_id, $rodada, $temporada]);

            endforeach;

            echo '- Atualização finalizada com sucesso.' . PHP_EOL . PHP_EOL;

        else :
            echo PHP_EOL . '- Temporada ainda não disponível.' . PHP_EOL . PHP_EOL;
        endif;
    }
}

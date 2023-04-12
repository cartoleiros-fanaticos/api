<?php

namespace App\Console\Commands;

use App\Http\Controllers\EscalacaoController;
use App\Models\EscalacaoTimes;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Console\Command;

class Escalacao extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:escalacao';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando sincroniza os times do cartoleiro fanatico.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $game = Game::first();

        if ($game->status_mercado === 1) :

            $request = new Request;

            $escalacao_times = EscalacaoTimes::select('access_token')
                ->get();

            foreach ($escalacao_times as $val) :

                $request->replace(['access_token' => $val->access_token]);

                $escalacao = new EscalacaoController;
                $escalacao->store($request);

            endforeach;

        endif;
    }
}

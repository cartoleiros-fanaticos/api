<?php

namespace App\Console\Commands;

use App\Models\Videos as ModelsVideos;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use App\Models\Game;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use Exception;
use Log;

class Videos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:videos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando carrega vídeos do canal e armazena no banco.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $temporada = Carbon::now()->format('Y');

        $game = Game::where('temporada', $temporada)
            ->first();

        if ($game) :

            try {

                echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

                $key = 'AIzaSyDX6AOQbUlb-uKExT73bZrBCRIyI9DgzPI';
                $playlistId = 'PLtrYO8pIjijhRI7RCSI1_bZV_tReIrooj';

                $client = new Client();
                $response = $client->get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&order=date&playlistId=' . $playlistId . '&key=' . $key . '&maxResults=50');
                $response = json_decode($response->getBody(), true);

                echo '- Atualizando tabela vídeos.' . PHP_EOL;

                foreach ((array) $response['items'] as $key => $val) :

                    ModelsVideos::updateOrCreate(
                        [
                            'video_id' => $val['snippet']['resourceId']['videoId'],
                            'temporada' => $temporada,
                        ],
                        [
                            'title' => $val['snippet']['title'],
                            'description' => substr($val['snippet']['description'], 0, 400),
                            'channel_id' => $val['snippet']['channelId'],
                            'thumbnails' => $val['snippet']['thumbnails']['high']['url'],
                            'created_at' => $val['snippet']['publishedAt'],
                        ]
                    );

                endforeach;

                echo '- Atualização finalizada com sucesso.' . PHP_EOL;
            } catch (QueryException $e) {
                echo $e->getMessage() . PHP_EOL;
                Log::error('Game: ' . $e->getMessage());
            } catch (RequestException $e) {
                echo $e->getMessage() . PHP_EOL;
                Log::error('Game: ' . $e->getMessage());
            } catch (Exception $e) {
                echo $e->getMessage() . PHP_EOL;
                Log::error('Game: ' . $e->getMessage());
            }

        else :
            echo PHP_EOL . '- Temporada ainda não disponível.' . PHP_EOL . PHP_EOL;
        endif;
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Config;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

class RefrehToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando atualiza o token';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $client = new Client();

        echo '- Atualizando token.' . PHP_EOL;

        $config = Config::find(1);

        $headers = ['Content-Type' => 'application/json'];
        $body = json_encode(['access_token' => $config->cartola_access_token]);

        $auth = $client->post("https://api.cartola.globo.com/refresh", ['timeout' => 180, 'headers' => $headers, 'body' => $body]);
        $auth = json_decode($auth->getBody(), true);

        $config->cartola_access_token = $auth['access_token'];
        $config->save();

        echo '- Token atualizado.' . PHP_EOL;
    }
}

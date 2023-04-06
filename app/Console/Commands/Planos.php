<?php

namespace App\Console\Commands;

use App\Models\Usuarios;
use Illuminate\Console\Command;

class Planos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:planos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando atualiza o plano de demonstrativo para cartoleiro FREE.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        echo PHP_EOL . '- Atualizando plano.' . PHP_EOL;

        Usuarios::where('plano', 'Demonstrativo')
            ->whereRaw('DATE_ADD(created_at, INTERVAL 15 DAY) < NOW()')
            ->update(['plano' => 'Free Cartoleiro']);

        echo '- Atualizado com sucesso.' . PHP_EOL . PHP_EOL;
    }
}

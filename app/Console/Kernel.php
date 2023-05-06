<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {

        $schedule->command('app:parciais')
            ->everyMinute();

        $schedule->command('app:escalacao')
            ->everyMinute();

        $schedule->command('app:game')
            ->everyTenMinutes();

        $schedule->command('app:atletas')
            ->hourly();

        $schedule->command('app:videos')
            ->hourly();

        $schedule->command('app:planos')
            ->hourly();

        $schedule->command('app:observacao')
            ->dailyAt('7:00');

        $schedule->command('app:parciais-rodadas')
            ->dailyAt('8:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

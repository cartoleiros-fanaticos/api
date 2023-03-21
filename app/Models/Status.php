<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'nome' ];

    public function newQuery()
    {
        return parent::newQuery()
            ->where('temporada', Carbon::now()->format('Y'));
    }
}

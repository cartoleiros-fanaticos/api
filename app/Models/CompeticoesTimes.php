<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompeticoesTimes extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['times_cartolas_id', 'usuarios_id', 'time_id'];

    public function time_cartola(){
        return $this->belongsTo(TimesCartola::class, 'times_cartolas_id', 'id');
    }
}

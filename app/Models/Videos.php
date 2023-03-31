<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'channel_id', 'title', 'description', 'video_id', 'thumbnails' ];

    // public function newQuery()
    // {
    //     return parent::newQuery()
    //         ->where('temporada', Carbon::now()->format('Y'));
    // }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    use HasFactory;
    protected $fillable = [
        'erabiltzailea_id',
        'puntuazioa',
    ];
    public function erabiltzailea(){
        return $this->belongsTo(Erabiltzailea::class);
    }
}

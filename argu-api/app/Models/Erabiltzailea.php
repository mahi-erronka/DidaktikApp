<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Erabiltzailea extends Model
{
    use HasFactory;
    protected $fillable = [
        'izena',
        'emaila',
        'pasahitza',
    ];
    public function Partidak()
    {
        return $this->hasMany(Partida::class);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Erabiltzailea;
class PartidaController extends Controller
{
    //

    public function index(){
        $partida = Partida::all();
        return response()->json($partida, 200);
    }
    
    public function show(Partida $partida){
        return response()->json($partida, 201);

    }
    public function store(Request $request){

        $userId = Auth::id();
        $partida = Partida::create([

            'erabiltzailea_id'=> $userId,
            'puntuazioa'=>$request->input('puntuazioa'),
            
        ]);
        return response()->json($partida, 201);
    }

    public function update(Request $request, Partida $partida){
        $partida->update([

            'erabiltzailea_id'=> $userId,
            'puntuazioa'=>$request->input('puntuazioa'),
            
        ]);
        return response()->json($partida, 201);
    }

    public function delete(Partida $partida){
        $partida->delete();

        return response()->json(null, 204);
    }
}

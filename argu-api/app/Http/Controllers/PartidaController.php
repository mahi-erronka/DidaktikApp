<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Partida;
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

        
        $partida = Partida::create($request->all());
        return response()->json($partida, 201);
    }

    public function update(Request $request, Partida $partida){
        $partida->update($request->all());

        return response()->json($partida, 201);
    }

    public function delete(Partida $partida){
        $partida->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Erabiltzailea;

class ErabiltzaileaController extends Controller
{
    public function index(){

        $erabiltzailea = Erabiltzailea::all();
        return response()->json($erabiltzailea, 200);
    }
    
    public function show(Erabiltzailea $erabiltzailea){
        return response()->json($erabiltzailea, 200);
    }

    public function store(Request $request){
        $erabiltzailea = Erabiltzailea::create($request->all());
        return response()->json($erabiltzailea, 200);
    }

    public function update(Request $request, Erabiltzailea $erabiltzailea){
        $erabiltzailea->update($request->all());
        return response()->json($erabiltzailea, 200);
    }

    public function delete(Erabiltzailea $erabiltzailea){
        $erabiltzailea->delete();

        return response()->json(null, 204);
    }
}

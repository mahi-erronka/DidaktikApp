<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ErabiltzaileaController;
use App\Http\Controllers\PartidaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//erabiltzaileak
Route::get('erabiltzaileak', [ErabiltzaileaController::class, 'index'])->name('erabiltzaileak');
Route::get('erabiltzaileak/{id}', [ErabiltzaileaController::class, 'show'])->name('erabiltzaileak/{id}');
Route::post('erabiltzaileak', [ErabiltzaileaController::class, 'store'])->name('erabiltzaileak');
Route::put('erabiltzaileak/{id}', [ErabiltzaileaController::class, 'update'])->name('erabiltzaileak/{id}');
Route::delete('erabiltzaileak/{id}', [ErabiltzaileaController::class, 'delete'])->name('erabiltzaileak/{id}');

//partidak
Route::get('partidak', [PartidaController::class, 'index'])->name('partidak');
Route::get('partidak/{id}', [PartidaController::class, 'show'])->name('partidak/{id}');
Route::post('partidak', [PartidaController::class, 'store'])->name('partidak');
Route::put('partidak/{id}', [PartidaController::class, 'update'])->name('partidak/{id}');
Route::delete('partidak/{id}', [PartidaController::class, 'delete'])->name('partidak/{id}');

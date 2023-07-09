<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataHandler;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/get-data',[DataHandler::class,"getClients"]);
Route::delete('/remove/{canal}',[DataHandler::class,"removeCanal"]);
Route::put('/change/{canal}',[DataHandler::class,"changeCanal"]);
Route::post('/add',[DataHandler::class,"addCanal"]);


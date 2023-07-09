<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataHandler extends Controller
{
    public function getClients()
    {
        $data = DB::table('clients')->get();
        return response()->json($data);
    }


    public function removeCanal(Request $request)
    {
        $client_canal = $request->canal;

        try {

            DB::table('clients')->where('canal', $client_canal)->delete();
            return response()->json(['message' => 'Deleting --> DONE']);

        } catch (\Exception $e) {
            return response()->json(['error' => 'DELETING ERROR'], 500);
        }
    }


    public function changeCanal(Request $request, $canal)
    {

        try {
            $new_amount = $request->input('amount');
    
            DB::table('clients')
                ->where('canal', $canal)
                ->update(['amount' => $new_amount]);
    
            return response()->json(['message' => 'Updating --> DONE']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'UPDATING ERROR'], 500);
        }
    }
    

    public function addCanal(Request $request)
    {
        $new_canal = $request->input('canal');
        $new_amount = $request->input('amount');

        try {
            $id = DB::table('clients')->insertGetId([
                'canal' => $new_canal,
                'amount' => $new_amount,
            ]);

            return response()->json(['message' => 'ADDING --> DONE']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'UPDATING ERROR'], 500);
        }
    }
}
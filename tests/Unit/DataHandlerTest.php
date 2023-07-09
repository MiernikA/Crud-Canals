<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;


class DataHandlerTest extends TestCase
{

    protected function refreshDatabase()
    {
        $this->baseRefreshDatabase();

        $tablesToPreserve = ['clients'];

        foreach ($tablesToPreserve as $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table($table)->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }


    public function testGetClients()
    {

        DB::shouldReceive('table')
            ->with('clients')
            ->andReturnSelf()
            ->shouldReceive('get')
            ->andReturn([
                ['canal' => 'canal_1', 'amount' => 100],
                ['canal' => 'canal_2', 'amount' => 200],
                ['canal' => 'canal_3', 'amount' => 300],
            ]);
    
        $response = $this->getJson('/api/get-data'); 
    
        $response->assertOk();
        $response->assertJsonCount(3);
        $response->assertJson([
            ['canal' => 'canal_1', 'amount' => 100],
            ['canal' => 'canal_2', 'amount' => 200],
            ['canal' => 'canal_3', 'amount' => 300],

        ]);
    }
    

    public function testRemoveCanal()
    {
        $canal = DB::table('clients')->insertGetId([
            'canal' => 'canal_1',
            'amount' => 100,
        ]);
    
        $response = $this->deleteJson('/api/remove/canal_1');
    
        $response->assertOk();
        $response->assertJson(['message' => 'Deleting --> DONE']);
        $this->assertDatabaseMissing('clients', [
            'canal' => 'canal_1',
            'amount' => 100,
        ]);
    }


    public function testAddCanal()
    {
    $newCanal = 'new_canal';
    $newAmount = 200;

    $response = $this->postJson('/api/add', [
        'canal' => $newCanal,
        'amount' => $newAmount,
    ]);

    $response->assertOk();
    $response->assertJson(['message' => 'ADDING --> DONE']);
    $this->assertDatabaseHas('clients', [
        'canal' => $newCanal,
        'amount' => $newAmount,
    ]);
    $this->deleteJson('/api/remove/new_canal');
    }


    public function testChangeCanal()
    {

    $client = DB::table('clients')->insertGetId([
        'canal' => 'canal_1',
        'amount' => 100,
    ]);


    $response = $this->putJson('/api/change/canal_1%20', ['amount' => 200]);


    $response->assertOk();
    $response->assertJson(['message' => 'Updating --> DONE']);


    $this->assertDatabaseHas('clients', [
        'canal' => 'canal_1',
        'amount' => 200,
    ]);
    
        $this->deleteJson('/api/remove/canal_1');
    }


}



    
    



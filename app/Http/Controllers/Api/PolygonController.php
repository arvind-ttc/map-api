<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Polygon;
use Illuminate\Http\Request;

class PolygonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $polygons = Polygon::all();

        return response()->json([
            'status' => true,
            'polygons' => $polygons
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $polygon = Polygon::create($request->all());

        $polygonData = $request->all();

        $polygon = Polygon::create($polygonData);

        // $polygon = new Polygon();
        // $polygon->info = $request->info;
        // $polygon->polygon = $request->polygon;
        // $polygon->save();

        return response()->json([
            'status' => true,
            'message' => "Polygon created successfully!",
            'polygon' => $polygon
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Polygon $polygon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Polygon $polygon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Polygon $polygon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Polygon $polygon)
    {
        //
    }
}

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Map with Click Event</title>
        <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" /> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2.rc.2/leaflet.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.css" />
        
        <link rel="stylesheet" href="./assets/style.css" />
    </head>

    <body>
        <div id="map"></div>

        <!-- <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2.rc.2/leaflet.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.js"></script>
        
        <div class="data-container">
            <div class="data-box">
                <b>Property Type: </b>
                <span id="prop"></span>
            </div>
            <div class="data-box">
                <b>Latitude: </b>
                <span id="co-x"></span>
            </div>
            <div class="data-box">
                <b>Longitude: </b>
                <span id="co-y"></span>
            </div>

            <div class="toggle-container">
                <label class="toggle-label">Udaipur Masterplan Overlay</label>
                <label class="toggle-switch">
                    <input class="toggle-input" type="checkbox" id="toggle" onclick="toggleButton()">
                    <span class="toggle-slider"></span>
                </label>
            </div>   
            
            <h3>Polygon's Coordinates</h3>
            <div id="coordinates"></div>
            <button onclick="getSelectedCoordinates()">Get Selected Coordinates</button>
            
            <button onclick="addGrid()">Add Grid</button>
            <button onclick="removeGrid()">Remove Grid</button>

            <script src="./assets/script.js"></script>
        </div>
    </body>
</html>
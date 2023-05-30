<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Map</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2.rc.2/leaflet.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/css/style.css" />
    </head>

    <body>
        <div id="map"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2.rc.2/leaflet.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
        <div class="data-container">
            <div class="data-box">
                <b>Property: </b>
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

            <br>

            <div class="toggle-container">
                <label class="toggle-label"><b>Udaipur Masterplan Overlay</b></label>
                <label class="toggle-switch">
                    <input class="toggle-input" type="checkbox" id="toggle" onclick="toggleButton()">
                    <span class="toggle-slider"></span>
                </label>
            </div> 

            <br>
                        
            <div>
                <button type="button" class="btn btn-primary" onclick="addGrid()">Add Grid</button>
                <button type="button" class="btn btn-secondary" onclick="removeGrid()">Remove Grid</button>
            </div>

            <script src="./assets/js/script.js"></script>
        </div>
    </body>
</html>
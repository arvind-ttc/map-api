// Initialize the map
var map = L.map('map').setView([24.58459276519208, 73.68957296445978], 13);
// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// ---- Add polygons from database to client side loaded map ---

let xhr2 = new XMLHttpRequest();
xhr2.open('get', 'http://127.0.0.1:8000/api/polygon');
xhr2.send();

xhr2.onload = function() {
    const polygons = JSON.parse(xhr2.response)['polygons'];

    for(p in polygons){
        const layer = L.geoJson(JSON.parse(JSON.parse(polygons[p]['data'])));
        layer.addTo(map);
    }
};
// -----------------------------------------------------------


// ------------- Add grid to map from api ---
const gridStyle = {
  "color": "#808080",
  "opacity": 0.4
}

let xhr = new XMLHttpRequest();
xhr.open('get', 'http://127.0.0.1:8000/api/grid');
xhr.send();

var gridLayers = [];

xhr.onload = function() {
    const grid = JSON.parse(xhr.response)['grid'];

    for(r in grid){
        var layer = L.geoJson((JSON.parse(grid[r]['data'])), {
          style: gridStyle
        });
        gridLayers.push(layer);
    }
};



function addGrid() {
  for(layer in gridLayers) {
    gridLayers[layer].addTo(map);
  }
}

function removeGrid() {
  for(layer in gridLayers) {
    map.removeLayer(gridLayers[layer]);
  }
}
// ----------------------------------------------

// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawPluginOptions = {
  position: 'topright',
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#97009c'
      }
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: false, // Turns off this drawing tool
    rectangle: false,
    marker: false,
    },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: false
  }
};
  
// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);


var imageUrl = './assets/images/udpr_roadmap_sketch.jpeg';
var latLngBounds = L.latLngBounds([[24.69443884773434, 73.60050201416017], [24.481836931335224, 73.94313812255861]]);
var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.5,
        interactive: true
    });


function toggleButton() {
    var toggle = document.getElementById("toggle");
    if (toggle.checked) {
      imageOverlay.addTo(map);
    } else {
      imageOverlay.removeFrom(map);
    }
}

// Function to handle click event on the map
function onMapClick(e) {
    // Retrieve the clicked coordinates
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    // Display the coordinates
    console.log("Clicked coordinates: " + lat + ", " + lng);
    var x = document.getElementById('co-x');
    var y = document.getElementById('co-y');
    x.innerText = lat;
    y.innerText = lng;
}

// Attach the click event listener to the map
map.on('click', onMapClick);

map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }

  var shape = layer.toGeoJSON()
  var shape_for_db = JSON.stringify(shape);

  const polygonData = {
    info: "information",
    data: JSON.stringify(shape_for_db)
  };

  postPolygon(polygonData);


  editableLayers.addLayer(layer);
});

async function postPolygon(body_data) {
  const url = 'http://127.0.0.1:8000/api/polygon';

  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data)
  });

  const text = await response.text();

  console.log(text);
}
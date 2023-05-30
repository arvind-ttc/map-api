// Initialize the map
var map = L.map('map').setView([24.58459276519208, 73.68957296445978], 13);
// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// let xhr2 = new XMLHttpRequest();
// xhr2.open('get', 'http://127.0.0.1:8000/api/polygon');
// xhr2.send();

// xhr2.onload = function() {
//     const polygons = JSON.parse(xhr2.response)['polygons'];
    
//     // console.log(polygons);

//     for(p in polygons){
//       console.log(JSON.parse(polygons[p]['data']));
//         var layer = L.geoJson((JSON.parse(polygons[p])['data']));
//         layer.addTo(map);
//         console.log("done");
//       // console.log((polygons[p])['data']);
//       // console.log(JSON.parse((grid[r]['data'])));
//     }
// };


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
      console.log("Adding...");
        var layer = L.geoJson((JSON.parse(grid[r]['data'])), {
          style: gridStyle
        });
        gridLayers.push(layer);
        // layer.addTo(map);
      // console.log((grid[r])['data']);
      // console.log(JSON.parse((grid[r]['data'])));
    }
};



function addGrid() {
  for(layer in gridLayers) {
    gridLayers[layer].addTo(map);
  }
}

function removeGrid() {
  console.log("Removing layers...");
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


var imageUrl = './1.jpeg';
var latLngBounds = L.latLngBounds([[24.69443884773434, 73.60050201416017], [24.481836931335224, 73.94313812255861]]);
var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.5,
        interactive: true
    });


function toggleButton() {
    var toggle = document.getElementById("toggle");
    if (toggle.checked) {
    // Toggle is ON
    console.log("Toggle is ON");
    
    // tl: Clicked coordinates: 24.69443884773434, 73.60050201416017
    // br: Clicked coordinates: 24.481836931335224, 73.94313812255861
    imageOverlay.addTo(map);
    } else {
    // Toggle is OFF
    console.log("Toggle is OFF");
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

  console.log(shape_for_db);
  console.log("Posting polygon...");
  postPolygon(polygonData);


  editableLayers.addLayer(layer);
});

let coordinatesContainer = document.getElementById("coordinates");

function getSelectedCoordinates() {
  const layer = editableLayers.getLayers()[0];
  if (layer instanceof L.Polygon) {
      const coordinates = layer.getLatLngs()[0];
      let polygon = new Array();
      coordinates.forEach(function(coord) {
          var subres = new Array();
          subres.push(coord.lat * 1000000);
          subres.push(coord.lng * 1000000);

          polygon.push(subres);
      });
      coordinatesContainer.innerText = JSON.stringify(polygon);
      // const pointsInsidePolygon = rasterizePolygon(polygon);
      // coordinatesContainer.innerText = JSON.stringify(pointsInsidePolygon);

      // postPolygon(polygonData);
  } else {
      coordinatesContainer.innerHTML = "No shape selected";
  }
}

async function postPolygon(body_data) {
  const url = 'http://127.0.0.1:8000/api/polygon';

  // console.log(body_data);

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



// ----------------
// function rasterizePolygon(polygon) {
//   const bounds = getPolygonBounds(polygon);
//   console.log(polygon);
//   console.log(bounds);
//   const minX = Math.floor(bounds.minX);
//   const minY = Math.floor(bounds.minY);
//   const maxX = Math.ceil(bounds.maxX);
//   const maxY = Math.ceil(bounds.maxY);

//   const points = [];

//   for (let x = minX; x < maxX; x++) {
//     for (let y = minY; y < maxY; y++) {
//       const point = [x + 0.5, y + 0.5]; // Center point of the cell
//       if (isPointInPolygon(point, polygon)) {
//         points.push(point);
//       }
//     }
//   }

//   return points;
// }

// function isPointInPolygon(point, polygon) {
//   let inside = false;
//   const x = point[0];
//   const y = point[1];

//   for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       const xi = polygon[i][0];
//       const yi = polygon[i][1];
//       const xj = polygon[j][0];
//       const yj = polygon[j][1];

//       const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//       if (intersect) {
//           inside = !inside;
//       }
//   }

//   return inside;
// }

// function getPolygonBounds(polygon) {
//   let minX = Number.MAX_VALUE;
//   let minY = Number.MAX_VALUE;
//   let maxX = Number.MIN_VALUE;
//   let maxY = Number.MIN_VALUE;

//   for (const point of polygon) {
//     const x = point[0];
//     const y = point[1];
//     if (x < minX) minX = x;
//     if (x > maxX) maxX = x;
//     if (y < minY) minY = y;
//     if (y > maxY) maxY = y;
//   }

//   return { minX, minY, maxX, maxY };
// }

// const polygon = [[0, 0], [0, 4], [4, 4], [4, 0]]; // Example polygon coordinates


// console.log(pointsInsidePolygon);

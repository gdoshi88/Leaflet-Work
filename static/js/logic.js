// ATTEMPT 2
// let url =
//   "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function markerSize(magnitude) {
//   return magnitude * 15000;
// }

// let earthquakes = new L.LayerGroup();

// d3.json(url, function(data) {
//   console.log(data.features);
//   L.geoJSON(data, {
//     pointToLayer: function(geoJsonPointFnc, latitudeLongitude) {
//       return L.circleMarker(latitudeLongitude, {
//         radius: markerSize(geoJsonPointFnc.properties.mag)
//       });
//     },
//     style: function(geoJsonFeature) {
//       return {
//         fillColor: circleColor(geoJsonFeature.properties.mag),
//         fillOpacity: 1,
//         color: "black"
//       };
//     },
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(
//         "<h3 style='text-align:center;'>" +
//           new Date(feature.properties.time) +
//           "</h3><hr><h2 style='text-align: center;'>" +
//           feature.properties.title +
//           "</h2>"
//       );
//     }
//   }).addTo(earthquakesMap);
//   createMap(earthquakes);
// });

// function circleColor(magnitude) {
//   if (magnitude < 1) {
//     return "pink";
//   } else if (magnitude < 2) {
//     return "yellow";
//   } else if (magnitude < 3) {
//     return "light blue";
//   } else if (magnitude < 4) {
//     return "orange";
//   } else if (magnitude < 5) {
//     return "red";
//   } else {
//     return "black";
//   }
// }

// function createMap(earthquakes) {
//   var satellite = L.tileLayer(
//     "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
//     {
//       maxZoom: 18,
//       id: "mapbox.satellite",
//       accessToken: API_KEY
//     }
//   );
//   var street = L.tileLayer(
//     "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
//     {
//       maxZoom: 18,
//       id: "mapbox.streets",
//       accessToken: API_KEY
//     }
//   );
//   let earthquakesMap = L.map("map", {
//     center: [39.8283, -98.5795],
//     zoom: 4,
//     layers: [street]
//   });
//   L.control.layers(baseLayers, overLays).addTo(earthquakeMap);
// }

// let baseLayers = {
//   Satellite: createMap.satellite,
//   Street: createMap.street
// };

// let overLays = {
//   Earthquakes: earthquakes
// };

// ATTEMPT 1
// Create map layer
// function createMap(earthquakes) {
//   L.tileLayer(
//     "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
//     {
//       maxZoom: 18,
//       id: "mapbox.satellite",
//       accessToken: API_KEY
//     }
//   );
// }

// // API data layer for popup, onClick, fillBounds
// function createFeatures(createFeatures) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(
//       `<h3>${feature.properties.place}</h3><hr><h2>` +
//         new Date(feature.properties.time) +
//         "</h2>"
//     );
//   }
//   function radiusSize(magnitude) {
//     return magnitude * 15000;
//   }
//   function circleColor(magnitude) {
//     if (magnitude < 1) {
//       return "pink";
//     } else if (magnitude < 2) {
//       return "yellow";
//     } else if (magnitude < 3) {
//       return "light blue";
//     } else if (magnitude < 4) {
//       return "orange";
//     } else if (magnitude < 5) {
//       return "red";
//     } else {
//       return "black";
//     }
//   }
// }
// let earthquakes = L.geoJSON(createFeatures, {
//   pointToLayer: function(createFeatures, laitudeLongitude) {
//     return L.circle(laitudeLongitude, {
//       radius: radiusSize(createFeatures.properties.mag),
//       color: circleColor(createFeatures.properties.mag),
//       fillOpacity: 1
//     });
//   },
//   createFeatures: createFeatures
// });

// createMap(earthquakes);

//ATTEMPT 3
var queryUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup(
      "<h3>" +
        feature.properties.place +
        "</h3><hr><p>" +
        new Date(feature.properties.time) +
        "</p>"
    );
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: colorRange(feature.properties.mag),
        color: "black",
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 0.8
      });
    },

    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  var streetmap = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    }
  );

  var darkmap = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    }
  );

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false
    })
    .addTo(myMap);

  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function(myMap) {
    var legend_loc = L.DomUtil.create("div", "info legend"),
      levels = [0, 1, 2, 3, 4, 5];

    for (var i = 0; i < levels.length; i++) {
      legend_loc.innerHTML +=
        '<i style="background:' +
        colorRange(levels[i]) +
        '"></i> ' +
        [i] +
        (levels[i + 1] ? "&ndash;" + levels[i + 1] + "<br>" : "+");
    }
    return legend_loc;
  };

  legend.addTo(myMap);
}

function colorRange(magnitude) {
  switch (true) {
    case magnitude >= 5.0:
      return "red";
      break;

    case magnitude >= 4.0:
      return "orangered";
      break;

    case magnitude >= 3.0:
      return "orange";
      break;

    case magnitude >= 2.0:
      return "gold";
      break;

    case magnitude >= 1.0:
      return "yellow";
      break;

    default:
      return "greenyellow";
  }
}

function markerSize(magnitude) {
  return magnitude * 4.5;
}

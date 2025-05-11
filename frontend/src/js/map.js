import { injuresDataController } from "./injuriesDataController";

const injuriesController = new injuresDataController()

// L for leaflet in global scope, create a map inside map div, setview with longitude and altitude
const map = L.map('map').setView([63.0, 16.0], 5)
injuriesController.getData()

let geojsonData 
// loading the geojson file remotely in raw geojson
fetch('https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson')
  .then(res => res.json())
  .then(geojson => {

    // the geojson layer to the map
    L.geoJson(geojson, {
      onEachFeature: (feature, layer) => {
        const county = feature.properties?.name || "Unnamed";
        layer.bindPopup(`<strong>${county}</strong>`);
      }
    }).addTo(map);
  })
  .catch(err => console.error('Failed to load gejson:', err));

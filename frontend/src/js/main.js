import { StylesController } from "./Styles.js";
import { injuresDataController } from "./injuriesDataController.js";
const stylesController = new StylesController()
const injuriesController = new injuresDataController()

// L for leaflet in global scope, create a map inside map div, setview with longitude and altitude
const map = L.map('map').setView([63.0, 16.0], 5)

// base tile from openstreetmap api
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

let geojsonData 
// loading the geojson file remotely in raw geojson
fetch('https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson')
  .then(res => res.json())
  .then(data => {
    geojsonData = data;
    updateMap(2023)
  })
  .catch(err => console.error('Failed to load gejson:', err));

  // updating map
  async function updateMap(year) {
    const mapData = await injuriesController.getData(year);
  
    // Clear previous layer
    if (window.countyLayer) {
        map.removeLayer(window.countyLayer);
    }

    // Add new layer
    window.countyLayer = L.geoJson(geojsonData, {
        style: (feature) => stylesController.style(injuriesController.getFixedCountyName(feature.properties.name, mapData), mapData),
        onEachFeature: (feature, layer) => {
            const county = feature.properties.name;
            const value = mapData[injuriesController.getFixedCountyName(county, mapData)]
            layer.bindPopup(`<strong>${county}</strong><br>Injuries: ${value}`);
        }
    }).addTo(map);
}

  // Listen for change when user changes year
document.getElementById('yearSelect').addEventListener('change', (e) => {
  let selectedYear = e.target.value;
  selectedYear = parseInt(selectedYear)
  updateMap(selectedYear);
});

  
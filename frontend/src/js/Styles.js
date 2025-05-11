

export class StylesController {
    // colors based on injuries
    #getColor (d) {
        return d > 5000 ? '#800026' :
               d > 2000 ? '#BD0026' :
               d > 1000 ? '#E31A1C' :
               d > 500  ? '#FC4E2A' :
               d > 100  ? '#FD8D3C' :
               d > 0    ? '#FEB24C' :
                          '#FFEDA0';
      }

    style (feature, mapData) {
        const county = feature.properties.name
        const value = mapData[county] || 0
        return {
            fillColor: this.#getColor(value),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        }
    }

}
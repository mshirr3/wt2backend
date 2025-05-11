

export class StylesController {
    // colors based on injuries
    #getColor(d) {
        return d > 5000 ? '#7f0000' :   // very dark red
               d > 3000 ? '#b30000' :   // deep red
               d > 2000 ? '#d7301f' :   // red-orange
               d > 1000 ? '#fc8d59' :   // orange
               d > 500  ? '#fdbb84' :   // light orange
                          '#ffffb2';    // bright yellow
    }
    style (county, mapData) {
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
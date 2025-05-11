

export class injuresDataController {
    async getData(year) {
        try {
          parseInt(year)
          const response = await fetch('http://127.0.0.1:5000/get_map_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Year: year })
        })

        if (!response.ok) {
            throw new Error('Failed to fetch injury data');
        }
        const data = await response.json()

        // make it to object with key-value pairs
        const injuryData = Object.fromEntries(
            data.map(entry => [entry.County, entry.Quantity])
          );
    
        return injuryData  
        } catch (err) {
            console.error('Error fetching data: ', err)
        }   
    }

    // trasnforms eg. 'Stockholm' from geojson to 'stockholms län' for backend data
    getFixedCountyName (county, mapData) {
        let correctCounty

        if (mapData[`${county} län`] == undefined) {
          correctCounty = `${county}s län`
          console.log("if", county)
          return correctCounty
        } else {
          correctCounty = `${county} län`
          console.log("else get fixed countynae", correctCounty)
          return correctCounty
        }
    }
}
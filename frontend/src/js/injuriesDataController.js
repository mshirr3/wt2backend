

export class injuresDataController {
    async getData(year= 2024) {
        const response = await fetch('http://127.0.0.1:5000/get_map_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Year: 2023 })
        })
        const data = await response.json()

        // make it to object with key-value pairs
        const injuryData= Object.fromEntries(
            data.map(entry => [entry.County, entry.Quantity])
          );
        console.log('injuries fetch response', injuryData)
        return injuryData
    }
}
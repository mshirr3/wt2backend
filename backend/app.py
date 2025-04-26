from flask import Flask
app = Flask(__name__)
from controllers import trafficAccidents

injured_data = trafficAccidents.load_injured_data()
deceased_data = trafficAccidents.load_deceased_data()

@app.route('/')
def hello():
    labels, data = trafficAccidents.prepare_data_for_bar(injured_data)
    return {'labels': labels, 'data': data}

app.run(debug=True)

if __name__ == "__main__":
    app.run()
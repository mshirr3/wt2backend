from flask import Flask, request, jsonify
from  flask_cors import CORS, cross_origin
from controllers import trafficAccidents


app = Flask(__name__)

CORS(app)  # alla origins tillåts

injured_data = trafficAccidents.load_injured_data()

@app.route('/get_map_data', methods=["POST", "OPTIONS"])
@cross_origin()
def get_map_data():
    if request.method == "POST":
        data = request.get_json(force=True)
        result = trafficAccidents.prepare_data_for_map(injured_data, data["Year"])
        return jsonify(result)
  


if  __name__ == '__main__':
    app.run(debug=True)
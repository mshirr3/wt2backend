from flask import Flask, request
from  flask_cors import CORS, cross_origin
from controllers import trafficAccidents


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ""}}, methods=["GET", "POST"],
allow_headers=["content-type"])

injured_data = trafficAccidents.load_injured_data()

@app.route('/get_map_data', methods=["POST", "OPTIONS"])
@cross_origin()
def hello():
    if request.method == "POST":
        data = request.get_json(force=true)
        result = trafficAccidents.prepare_data_for_map(injured_data, data("Year"))
        return result
  


if  __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import requests
import os

app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.sportsdata.io"


@app.route("/api/scores", methods=["POST"])
def get_scores():
    date = request.json["date"]
    response = requests.get(
        f"{BASE_URL}/v3/nba/scores/json/GamesByDate/{date}?key={API_KEY}"
    )
    scores = response.json()
    return jsonify(scores)


if __name__ == "__main__":
    app.run(debug=True)

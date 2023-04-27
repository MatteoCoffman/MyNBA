from flask import Flask, jsonify, request
from dotenv import load_dotenv
import requests
import os

app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.sportsdata.io"
BAKER_URL = "https://baker-api.sportsdata.io"


@app.route("/api/scores", methods=["POST"])
def get_scores():
    date = request.json["date"]
    response = requests.get(
        f"{BASE_URL}/v3/nba/scores/json/GamesByDate/{date}?key={API_KEY}"
    )
    scores = response.json()
    return jsonify(scores)


@app.route("/api/in-game-odds", methods=["POST"])
def get_in_game_odds():
    date = request.json["date"]
    response = requests.get(
        f"{BASE_URL}/v3/nba/odds/json/LiveGameOddsByDate/{date}?key={API_KEY}"
    )
    in_game_odds = response.json()
    return jsonify(in_game_odds)


@app.route("/api/best-bets", methods=["POST"])
def best_bets():
    if request.method == "POST":
        date = request.json["date"]
        response = requests.get(
            f"{BAKER_URL}/baker/v2/nba/best-bets/{date}?key={API_KEY}"
        )
        best_bets = response.json()
        return jsonify(best_bets)


if __name__ == "__main__":
    app.run(debug=True)

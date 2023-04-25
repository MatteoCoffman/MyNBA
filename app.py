from flask import Flask, jsonify, render_template, request
from dotenv import load_dotenv
import requests
import os

app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.sportsdata.io"


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        date = request.form["date"]
        response = requests.get(
            f"{BASE_URL}/v3/nba/scores/json/GamesByDate/{date}?key={API_KEY}"
        )
        scores = response.json()
        return render_template("scores.html", scores=scores)
    return render_template("home.html")


if __name__ == "__main__":
    app.run(debug=True)

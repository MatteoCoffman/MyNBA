import flask
import os
import json
import requests
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy


load_dotenv(find_dotenv())
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.sportsdata.io"

app = flask.Flask(__name__)
app.secret_key = os.getenv("SUPER_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self) -> str:
        return f"Person with username: {self.username}"


with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return flask.render_template("login.html")


@app.route("/login", methods=["POST", "GET"])
def login_user():
    if flask.request.method == "POST":
        form_data_login = flask.request.form
        login_username = form_data_login["username"]
        if check_username(login_username):
            flask.session["username"] = login_username
            return flask.redirect(flask.url_for("get_scores"))
        else:
            flask.flash("User not found")
            return flask.render_template("login.html")
    else:
        return flask.render_template("login.html")


def check_username(username):
    return User.query.filter_by(username=username).first()


@app.route("/signup", methods=["POST", "GET"])
def signup_user():
    if flask.request.method == "POST":
        form_data_signup = flask.request.form
        signup_username = form_data_signup["username"]
        user = User(username=signup_username)
        if check_username(signup_username):
            flask.flash("This username has been used. Try a different one")
            return flask.render_template("signup.html")
        else:
            db.session.add(user)
            db.session.commit()
            flask.flash("You have successfully signed up. Please login to continue.")
            return flask.redirect(flask.url_for("login_user"))

    else:
        return flask.render_template("signup.html")


@app.route("/api/scores", methods=["POST", "GET"])
def get_scores():
    date = flask.request.json["date"]
    response = requests.get(
        f"{BASE_URL}/v3/nba/scores/json/GamesByDate/{date}?key={API_KEY}"
    )
    scores = response.json()
    return flask.jsonify(scores)


if __name__ == "__main__":
    app.run(debug=True)

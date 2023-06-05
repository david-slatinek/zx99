import base64
import os
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# python -m flask --debug run
load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/devMinty/zx99-animal-classifier"
headers = {"Authorization": "Bearer " + os.getenv("TOKEN")}

app = Flask(__name__)
CORS(app)


# default route
@app.route("/")
def starting():
    return {"ping": "pong"}


# predict based on picture returns most accurate prediction
# ker se HUGGING FACE server zaganja približno 20 sekund moramo ta čas čakati ali pa večkrat poslati zahtevo
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return {"error": "image not found"}, 400

    image = request.files["image"]
    image_bytes = image.read()

    response = requests.post(API_URL, headers=headers, data=image_bytes)

    # zbudim server
    if "error" in str(response.content):
        time.sleep(20)

        response = requests.post(API_URL, headers=headers, data=image_bytes)

    ff = wiki_scrape(response.json()[0]['label'])

    prediction = response.json()[0]['label']

    result = {
        "prediction": prediction,
        "fun_fact": ff
    }

    return jsonify(result), 200


# route for user feedback based on prediction
@app.route("/feedback", methods=["POST"])
def add_feedback():
    image = request.files["image"]

    if not image:
        return {"error": "image not found"}, 400

    image_bytes = base64.b64encode(image.read())

    predicted_label = request.form["predicted_label"]
    true_label = request.form["true_label"]
    description = request.form["description"]
    timestamp = datetime.now()

    if not predicted_label or not description:
        return {"error": "missing data"}, 400

    collection.insert_one({
        "image": image_bytes.decode("utf-8"),
        "predicted_label": predicted_label,
        "true_label": true_label if true_label else predicted_label,
        "description": description,
        "time": timestamp
    })

    return {"message": "Thank you!"}, 201


# route that gets some info about animal based on prediction
@app.route("/wikitest/<animal>", methods=["POST"])
def wikitest(animal):
    paragraph_text = wiki_scrape(animal)
    return jsonify({"paragraph": paragraph_text})


def wiki_scrape(animal):
    if " " in animal:
        animals = animal.split(" ")
        animals[0] = animals[0].capitalize()
        animals[1] = animals[1].capitalize()
        animal = animals[0] + "_" + animals[1]
    elif "_" in animal:
        animals = animal.split("_")
        animals[0] = animals[0].capitalize()
        animals[1] = animals[1].capitalize()
        animal = animals[0] + "_" + animals[1]
    else:
        animal.capitalize()

    url = "https://en.wikipedia.org/wiki/" + animal
    if requests.get(url).status_code != 200:
        return jsonify({"paragraph": "no information found for used search parameter"})
    else:
        response = requests.get("https://en.wikipedia.org/wiki/" + animal)
        soup = BeautifulSoup(response.content, "html.parser")
        paragraphs = soup.find_all("p")

        paragraph_text = "no information found"

        for paragraph in paragraphs:
            if animal in paragraph.get_text():
                paragraph_text = paragraph.get_text()
                paragraph_text = paragraph_text.replace("\n", "")
                paragraph_text = paragraph_text.replace("[1]", "")
                paragraph_text = paragraph_text.replace("[2]", "")
                paragraph_text = paragraph_text.replace("[3]", "")
                paragraph_text = paragraph_text.replace("[4]", "")
                paragraph_text = paragraph_text.replace("[5]", "")
                paragraph_text = paragraph_text.replace("[6]", "")
                break
            elif "_" in animal:
                wordeOne = animal.split("_")[0]
                if wordeOne in paragraph.get_text():
                    paragraph_text = paragraph.get_text()
                    paragraph_text = paragraph_text.replace("\n", "")
                    paragraph_text = paragraph_text.replace("[1]", "")
                    paragraph_text = paragraph_text.replace("[2]", "")
                    paragraph_text = paragraph_text.replace("[3]", "")
                    paragraph_text = paragraph_text.replace("[4]", "")
                    paragraph_text = paragraph_text.replace("[5]", "")
                    paragraph_text = paragraph_text.replace("[6]", "")
                    break
            elif " " in animal:
                wordeOne = animal.split(" ")[0]
                if wordeOne in paragraph.get_text():
                    paragraph_text = paragraph.get_text()
                    paragraph_text = paragraph_text.replace("\n", "")
                    paragraph_text = paragraph_text.replace("[1]", "")
                    paragraph_text = paragraph_text.replace("[2]", "")
                    paragraph_text = paragraph_text.replace("[3]", "")
                    paragraph_text = paragraph_text.replace("[4]", "")
                    paragraph_text = paragraph_text.replace("[5]", "")
                    paragraph_text = paragraph_text.replace("[6]", "")
                    break

        return paragraph_text


if __name__ == "__main__":
    client = MongoClient(os.getenv("MONGO_URL"))

    try:
        client.admin.command("ping")
    except ConnectionFailure as e:
        raise e

    db = client.get_database("zx99-db")
    collection = db.get_collection("animals")

    app.run(debug=False, host="0.0.0.0", port=5000)

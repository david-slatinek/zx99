from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from pymongo import MongoClient
from datetime import datetime
import time
import json
from bs4 import BeautifulSoup
import re

#python -m flask --debug run


#client = MongoClient('mongodb+srv://test123:test123@cluster0.zy8ouhh.mongodb.net/?retryWrites=true&w=majority')
#db = client.IISprojekt #slatinek spremeni pol ko boš mel povezavo
#zivali = db.zivali

API_URL = "https://api-inference.huggingface.co/models/devMinty/zx99-animal-classifier"
headers = {"Authorization": "Bearer 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"}

app = Flask(__name__)
CORS(app)

#default route
@app.route('/')
def starting():
    return "Hello world IS"

#predict based on picture returns most accurate prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return "No image found", 400
    
    image = request.files['image']
    image_bytes = image.read()

    response = requests.post(API_URL, headers=headers, data=image_bytes)

    # zbudim server
    if "error" in str(response.content):
        time.sleep(20)

        response = requests.post(API_URL, headers=headers, data=image_bytes)

    ff = wikitest(response.json()[0])
    prediction =  response.json()[0]

    result = {
        'prediction': prediction,
        'fun_fact': ff
    }

    return jsonify(result), 200




#route for user feedback based on prediction
@app.route('/feedback', methods=['POST'])
def add_feedback():
    image = request.files['image'].read()
    predicted_label = request.form['predicted_label']
    true_label = request.form['true_label']
    description = request.form['description']
    time = datetime.now()
 
    if not image or not predicted_label or not description: 
        return "Missing data", 400

    # zivali.insert_one({ #slatinek change this when baza is ready
    #     'image': image,
    #     'predicted_label': predicted_label,
    #     'true_label': true_label if true_label else predicted_label,
    #     'description': description,
    #     'time': time
    # })

    return "Thank you!", 201


#route that gets some info about animal based on prediction
@app.route('/wikitest/<animal>', methods=['POST'])
def wikitest(animal):

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
        return jsonify({'paragraph': "No information found for used search parameter"})
    else:
        response = requests.get("https://en.wikipedia.org/wiki/" + animal)
        soup = BeautifulSoup(response.content, 'html.parser')
        paragraphs = soup.find_all('p')

        for paragraph in paragraphs:
            if animal in paragraph.get_text():
                paragraph_text = paragraph.get_text()
                paragraph_text = paragraph_text.replace('\n', '')
                paragraph_text = paragraph_text.replace('[1]', '')
                paragraph_text = paragraph_text.replace('[2]', '')
                paragraph_text = paragraph_text.replace('[3]', '')
                paragraph_text = paragraph_text.replace('[4]', '')
                paragraph_text = paragraph_text.replace('[5]', '')
                paragraph_text = paragraph_text.replace('[6]', '')
                break
            elif "_" in animal:
                wordeOne = animal.split("_")[0]
                if wordeOne in paragraph.get_text():
                    paragraph_text = paragraph.get_text()
                    paragraph_text = paragraph_text.replace('\n', '')
                    paragraph_text = paragraph_text.replace('[1]', '')
                    paragraph_text = paragraph_text.replace('[2]', '')
                    paragraph_text = paragraph_text.replace('[3]', '')
                    paragraph_text = paragraph_text.replace('[4]', '')
                    paragraph_text = paragraph_text.replace('[5]', '')
                    paragraph_text = paragraph_text.replace('[6]', '')
                    break
            elif " " in animal:
                wordeOne = animal.split(" ")[0]
                if wordeOne in paragraph.get_text():
                    paragraph_text = paragraph.get_text()
                    paragraph_text = paragraph_text.replace('\n', '')
                    paragraph_text = paragraph_text.replace('[1]', '')
                    paragraph_text = paragraph_text.replace('[2]', '')
                    paragraph_text = paragraph_text.replace('[3]', '')
                    paragraph_text = paragraph_text.replace('[4]', '')
                    paragraph_text = paragraph_text.replace('[5]', '')
                    paragraph_text = paragraph_text.replace('[6]', '')
                    break
            else:
                paragraph_text = "No information found"
        
        return jsonify({'paragraph': paragraph_text})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
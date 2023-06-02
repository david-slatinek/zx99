import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Facts from './Facts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [score, setScore] = useState(0);

  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackLabel, setFeedbackLabel] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) return;

    try {
        console.log('Selected image:', selectedImage);
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post('http://localhost:5000/predict', formData);

    console.log('Prediction result:', response.data.prediction.label);
    setPrediction(response.data.prediction.label)
    console.log('Prediction result:', response.data.prediction.score);
    setScore(response.data.prediction.score.toFixed(4) * 100)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFeedbackSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('predicted_label', prediction);
    formData.append('true_label', feedbackLabel); 
    formData.append('description', feedbackComment);
    
    try {
        const response = await axios.post('http://localhost:5000/feedback', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data.message)
        setFeedbackComment('');
        setFeedbackLabel('');
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
  };

  return (
    <div>
      <h2>IS projekt</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {prediction && (
        <>
            <p>
            Prediction: {prediction} | Score: {score} %
            </p>
            <Link to={{ pathname: `/facts/${prediction}`, state: { prediction } }}>
                View Facts {prediction}
            </Link>
            <input
                type="text"
                placeholder="Comment"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              />
              <input
                type="text"
                placeholder="True label"
                value={feedbackLabel}
                onChange={(e) => setFeedbackLabel(e.target.value)}
              />
            <button onClick={handleFeedbackSubmit}>Stisni me</button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
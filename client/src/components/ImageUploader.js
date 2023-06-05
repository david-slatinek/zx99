import React, { useState } from 'react';
import './ImageUploader.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [score, setScore] = useState(0);

  const [facts, setFacts] = useState('')

  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackLabel, setFeedbackLabel] = useState('');

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
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
      // console.log(response.data)
      // console.log('Prediction result:', response.data.prediction);
      setPrediction(response.data.prediction)
      // console.log(response.data.fun_fact)
      setFacts(response.data.fun_fact)
      // console.log('Prediction result:', response.data.prediction.score);
      // setScore(response.data.prediction.score.toFixed(4) * 100)

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
        console.error('Error:', error);
      }
  };

  return (
    <div className='ImageUploader'>
      <h2>Predicting animal from image</h2>
      {imagePreview && (
        <div className='image-container'>
          <img src={imagePreview} alt="Preview" id='preview-image'/>
        </div>
      )}
      <form onSubmit={handleSubmit} className='form'>
        <input type="file" accept="image/*" onChange={handleImageChange} id='file'/>
        <label htmlFor='file' className='label-file'>
        <i className="fa-solid fa-image"></i> &nbsp;
          Choose an Image
          </label>
        <br />
        {selectedImage && (
          <button type="submit" className='button'>Upload</button>
        )}
      </form>
      {prediction && (
        <>
            <h2>
            Prediction: {prediction} 
            </h2>
            {/* <Link to={{ pathname: `/facts/${prediction}`, state: { prediction } }} className='link'>
                View Facts about {prediction}
            </Link> */}
             {/* state: { prediction, facts } */}
            <Link to={{ pathname: `/facts/${prediction}` }} className='link'> 
              {(facts).length <= 30 ? facts : `View facts about ${prediction}: ${facts.slice(0,30)} ...`}
            </Link>
            <form className='feedback-form'>
              <input
                  type="text"
                  placeholder="True label"
                  value={feedbackLabel}
                  onChange={(e) => setFeedbackLabel(e.target.value)}
                />
              <input
                  type="text"
                  placeholder="Comment"
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                />
                <br />
              <button onClick={handleFeedbackSubmit} className='button'>Feedback</button>
            </form>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
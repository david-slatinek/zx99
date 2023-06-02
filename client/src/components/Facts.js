import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Facts = () => {
    const {animal} = useParams();
    const [facts, setFacts] = useState('')

    useEffect(()=>{
        const fetchFacts = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/wikitest/${animal}`);
                console.log(response.data.paragraph)
                setFacts(response.data.paragraph)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchFacts();
    },[])



    return (
    <div>
        <h2>Facts {animal}</h2>
        {facts &&
            <p>{facts}</p>
        }
    </div>
    );
};

export default Facts;

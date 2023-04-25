import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scores = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const response = await axios.get('/api/scores');
            setScores(response.data);
        };
        fetchScores();
    }, []);

    return (
        <div>
            <h1>NBA Scores</h1>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>
                        {score.AwayTeam} vs {score.HomeTeam}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scores;

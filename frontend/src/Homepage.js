import React, { useState } from 'react';

const Homepage = () => {
    const [date, setDate] = useState('');
    const [scores, setScores] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date })
            });
            const data = await response.json();
            setScores(data);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    return (
        <div>
            <h1>NBA Scores</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">Get Scores</button>
            </form>
            <div>
                {scores.map((score, index) => (
                    <div key={index}>
                        {score.HomeTeam} {score.HomeTeamScore} vs {score.AwayTeam} {score.AwayTeamScore}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;

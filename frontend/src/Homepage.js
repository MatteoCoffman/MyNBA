import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';

const Homepage = () => {
    const [date, setDate] = useState('');
    const [scores, setScores] = useState([]);
    const [bestBets, setBestBets] = useState([]);
    const [inGameOdds, setInGameOdds] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const response = await axios.post('/api/scores', { date });
            setScores(response.data);
        };
        fetchScores();
    }, [date]);

    const fetchInGameOdds = async () => {
        const response = await fetch('/api/in-game-odds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
        });
        const data = await response.json();
        console.log('In-Game Odds:', data);
        setInGameOdds(data);
    };

    const fetchBestBets = async () => {
        const response = await fetch('/api/best-bets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
        });
        const data = await response.json();
        console.log('Best Bets:', data);
        setBestBets(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchInGameOdds();
        fetchBestBets();
    };

    return (
        <div>
            <h1>MyNBA</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">Confirm</button>
            </form>
            <div className="scores-container">
                <h2>Scores</h2>
                {Array.isArray(scores) ? (
                    scores.map((score, index) => (
                        <div key={index} className="score">
                            {score.HomeTeam} {score.HomeTeamScore} vs {score.AwayTeam} {score.AwayTeamScore}
                        </div>
                    ))
                ) : (
                    <p>No scores available</p>
                )}
            </div>
            <div>
                <h2>In-Game Odds</h2>
                {inGameOdds.map((gameOdds, index) => {
                    const odds = gameOdds.LiveOdds[0];
                    if (!odds) return null;
                    const { HomeMoneyLine, AwayMoneyLine, HomePointSpread, AwayPointSpread, OverUnder, OverPayout, UnderPayout } = odds;
                    return (
                        <div key={index} className="odds">
                            <p>
                                {gameOdds.HomeTeamName} Money Line: {HomeMoneyLine} vs {gameOdds.AwayTeamName} Money Line: {AwayMoneyLine}
                            </p>
                            <p>
                                {gameOdds.HomeTeamName} Point Spread: {HomePointSpread} vs {gameOdds.AwayTeamName} Point Spread: {AwayPointSpread}
                            </p>
                            <p>Over/Under: {OverUnder}</p>
                            <p>
                                Over Payout: {OverPayout} / Under Payout: {UnderPayout}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div>
                <h3>Best Bets</h3>
                {Array.isArray(bestBets) ? (
                    bestBets.map((bestBet, index) => (
                        <div key={index}>
                            <p>
                                {bestBet.HomeTeam} vs {bestBet.AwayTeam}
                            </p>
                            <p>Best Bet: {bestBet.BestBet}</p>
                        </div>
                    ))
                ) : (
                    <p>No best bets available</p>
                )}
            </div>
        </div>
    );
};

export default Homepage;

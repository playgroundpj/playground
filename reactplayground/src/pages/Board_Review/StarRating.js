// src/components/StarRating.js
import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`star ${i <= rating ? 'selected' : ''}`}>&#9733;</span>
        );
    }

    return <div>{stars}</div>;
};

export default StarRating;

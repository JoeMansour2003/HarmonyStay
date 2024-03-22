import React from 'react';
import '../App.css';

function Section({ subtitle, description }) {
  return (
    <div>
      <div className="subtitle-container">
        <h2>{subtitle}</h2>
      </div>
      <div className="description">
        {description}
      </div>
    </div>
  );
}

export default Section;
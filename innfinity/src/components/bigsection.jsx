import React from 'react';
import '../App.css';

function BigSection({ subtitle, description }) {
  return (
    <div>
      <div className="title-container">
        <h1>{subtitle}</h1>
      </div>
      <div className="description">
        {description}
      </div>
    </div>
  );
}

export default BigSection;
import React from 'react';

const MaxValue = 19;
const MinValue = 0;

const colorStyle = (value) => {
  // Range 0 - 10
  const fixed = 250 - Math.min(Math.max(value,MinValue), MaxValue) * 20;
  const brightness = `0${fixed.toString(16)}`.slice(-2).toUpperCase();
  return {
    backgroundColor:`#F8${brightness}${brightness}`
  };
};

const Day = ({ heat }) => {
  return (
    <div className="day" style={colorStyle(heat)}>
      <div className="square">
        <div className="square_content">
          { heat }
        </div>  
      </div>
    </div>
  )
};

export default Day;
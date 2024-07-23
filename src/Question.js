import React from 'react';

const Question = ({ question, options, type, name, handleChange }) => {
  return (
    <div className="question">
      <p>{question}</p>
      {type === 'radio' || type === 'checkbox' ? (
        options.map((option, index) => (
          <div key={index} className="option-wrapper">
            <input
              type={type}
              name={name}
              value={option}
              onChange={handleChange}
            />{' '}
            {option}
          </div>
        ))
      ) : type === 'text' ? (
        <input type="text" name={name} onChange={handleChange} />
      ) : type === 'select' ? (
        <select name={name} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};
export default Question;
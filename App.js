import React, { useState, useEffect } from 'react';
import Question from './Question';
import './App.css';
const questions = [
  {
    id: 'question1',
    question: '1. What is the correct syntax to print a message in Python?',
    type: 'radio',
    options: ["echo 'Hello, World!'", "console.log('Hello, World!')", "print('Hello, World!')", "printf('Hello, World!')"],
  },
  {
    id: 'question2',
    question: '2. Which of the following are valid variable names in JavaScript? (Select all that apply)',
    type: 'checkbox',
    options: ['2names', '_name', 'first-name', 'first_name'],
  },
  {
    id: 'question3',
    question: '3. What is the output of 2 + 2 in JavaScript?',
    type: 'text',
  },
  {
    id: 'question4',
    question: '4. Which language is primarily used for web development?',
    type: 'select',
    options: ['Python', 'Java', 'HTML', 'C++'],
  },
  {
    id: 'question5',
    question: '5. Which HTML tag is used to define an unordered list?',
    type: 'radio',
    options: ['<ol>', '<ul>', '<li>', '<list>'],
  },
  {
    id: 'question6',
    question: '6. Which of the following are JavaScript data types?',
    type: 'radio',
    options: ['String', 'Number', 'Boolean', 'All of the above'],
  },
  {
    id: 'question7',
    question: '7. What does CSS stand for?',
    type: 'radio',
    options: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets'],
  },
  {
    id: 'question8',
    question: '8. Which of the following are semantic HTML elements? (Select all that apply)',
    type: 'checkbox',
    options: ['<div>', '<header>', '<span>', '<footer>'],
  },
  {
    id: 'question9',
    question: '9. What is the output of \'Hello\' + \' \' + \'World\' in JavaScript?',
    type: 'text',
  },
  {
    id: 'question10',
    question: '10. Which property is used to change the background color in CSS?',
    type: 'radio',
    options: ['color', 'bgcolor', 'background-color', 'background'],
  },
  {
    id: 'question11',
    question: '11. Which of the following is a JavaScript framework?',
    type: 'radio',
    options: ['React', 'Django', 'Flask', 'Ruby on Rails'],
  },
  {
    id: 'question12',
    question: '12. How do you add a comment in a CSS file?',
    type: 'text',
  },
  {
    id: 'question13',
    question: '13. Which of the following is a block-level element in HTML?',
    type: 'radio',
    options: ['<span>', '<div>', '<a>', '<img>'],
  },
  {
    id: 'question14',
    question: '14. What does SQL stand for?',
    type: 'radio',
    options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'Short Query Language'],
  },
  {
    id: 'question15',
    question: '15. Which of the following are CSS frameworks?',
    type: 'radio',
    options: ['Bootstrap', 'Foundation', 'Bulma', 'All of the above'],
  },
  {
    id: 'question16',
    question: '16. What is the purpose of the \'alt\' attribute in an <img> tag?',
    type: 'radio',
    options: ['To specify the URL of the image', 'To specify alternate text for the image', 'To style the image', 'To specify the width of the image'],
  },
  {
    id: 'question17',
    question: '17. Which of the following are JavaScript loop structures?',
    type: 'radio',
    options: ['for', 'foreach', 'while', 'All of the above'],
  },
  {
    id: 'question18',
    question: '18. What does API stand for?',
    type: 'radio',
    options: ['Automated Programming Interface', 'Application Programming Interface', 'Automated Programming Instruction', 'Application Programming Instruction'],
  },
  {
    id: 'question19',
    question: '19. How do you declare a variable in Python?',
    type: 'select',
    options: ['var x', 'x = 5', 'int x', 'declare x'],
  },
  {
    id: 'question20',
    question: '20. Which of the following is NOT a valid color in CSS?',
    type: 'radio',
    options: ['blue', 'rgb(255, 0, 0)', '#ff0000', 'red'],
  }
];

const correctAnswers = {
  question1: "print('Hello, World!')",
  question2: ['_name', 'first_name'],
  question3: '4',
  question4: 'HTML',
  question5: '<ul>',
  question6: 'All of the above',
  question7: 'Cascading Style Sheets',
  question8: ['<header>', '<footer>'],
  question9: 'Hello World',
  question10: 'background-color',
  question11: 'React',
  question12: '/* comment */',
  question13: '<div>',
  question14: 'Structured Query Language',
  question15: 'All of the above',
  question16: 'To specify alternate text for the image',
  question17: 'All of the above',
  question18: 'Application Programming Interface',
  question19: 'x = 5',
  question20: 'red'
};


const QuizApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(questions.length / 5); // Assuming 5 questions per page
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnswers((prevAnswers) => {
      if (type === 'checkbox') {
        const values = prevAnswers[name] || [];
        if (checked) {
          values.push(value);
        } else {
          const index = values.indexOf(value);
          if (index > -1) {
            values.splice(index, 1);
          }
        }
        return { ...prevAnswers, [name]: values };
      } else {
        return { ...prevAnswers, [name]: value };
      }
    });
  };

  const submitQuiz = () => {
    let score = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (Array.isArray(correctAnswers[key])) {
        const correctValues = correctAnswers[key].sort().join(',');
        const userValues = (answers[key] || []).sort().join(',');
        if (correctValues === userValues) {
          score++;
        }
      } else {
        if ((answers[key] || '').toLowerCase() === correctAnswers[key].toLowerCase()) {
          score++;
        }
      }
    });
    setScore(score);
  };

  const showPage = (page) => {
    return questions.slice((page - 1) * 5, page * 5).map((question) => (
      <Question
        key={question.id}
        question={question.question}
        options={question.options}
        type={question.type}
        name={question.id}
        handleChange={handleChange}
      />
    ));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (score !== null) {
    return (
      <div className="score-container">
        <p>You scored {score} out of {questions.length} ({((score / questions.length) * 100).toFixed(2)}%)</p>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="quiz-app">
      <div className="timer-container">
        <div id="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      </div>
      <div className="quiz-container">
        {showPage(currentPage)}
      </div>
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        {currentPage < questions.length ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={submitQuiz}>Submit</button>
        )}
      </div>
    </div>
  );
};
export default QuizApp;
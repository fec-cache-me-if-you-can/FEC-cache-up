import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SearchQuestions from './SearchQuestions.jsx';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

export default function QuestionsList({ productId, productName }) {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState('');
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [moreIsHidden, setMoreIsHidden] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideNextPage, setHideNextPage] = useState(false);
  const [hidePreviousPage, setHidePreviousPage] = useState(true);

  const getQuestions = React.useCallback(
    (product_id = productId, page = 1, count = 10000000) => {
      return axios.get(
        `/qa/questions?product_id=${product_id}&page=${page}&count=${count}`,
      );
    },
    [productId],
  );

  useEffect(() => {
    getQuestions(productId)
      .then((result) => setQuestions(result.data.results))
      .catch((err) => console.log(err));
  }, [productId, getQuestions]);

  useEffect(() => {
    displayedQuestions > 4 ? setMoreIsHidden(false) : setMoreIsHidden(true);
  }, [displayedQuestions]);

  useEffect(() => {
    if (displayedQuestions >= questions.length) {
      setHideButton(true);
    } else {
      setHideButton(false);
    }
  }, [displayedQuestions, questions.length]);

  useEffect(() => {
    getQuestions(productId, currentPage + 1)
      .then((result) => {
        result.data.results.length
          ? setHideNextPage(false)
          : setHideNextPage(true);
      })
      .catch((err) => console.log(err));
  }, [currentPage, getQuestions, productId]);

  useEffect(() => {
    currentPage > 1 ? setHidePreviousPage(false) : setHidePreviousPage(true);
  }, [currentPage]);

  useEffect(() => {
    getQuestions(productId, currentPage)
      .then((result) => setQuestions(result.data.results))
      .catch((err) => console.log(err));
  }, [currentPage, productId, getQuestions]);

  const updateQuery = (value) => setQuery(value);

  const handleLoadMoreQuestions = () => {
    setDisplayedQuestions(questions.length);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const resetDisplayedQuestions = () => {
    setCurrentPage(1);
    setDisplayedQuestions(4);
  };

  const createQuestion = (body) => {
    body.product_id = productId;
    return axios.post('/qa/questions', body);
  };

  return (
    <div className="questions-container w-100">
      <div className="d-flex justify-content-between mb-4 w-100">
        <SearchQuestions update={updateQuery} />
        <AddQuestion
          refreshQuestions={getQuestions}
          onSubmit={createQuestion}
          setQuestions={setQuestions}
          productName={productName}
        />
      </div>

      <div
        className="overflow-y-scroll overflow-x-hidden mb-3"
        style={{ maxHeight: '50vh' }}
      >
        {(query.length
          ? questions.reduce((acc, question) => {
              if (
                question.question_body
                  .toLowerCase()
                  .includes(query.toLowerCase())
              ) {
                acc.push(question);
              }
              return acc;
            }, [])
          : questions
        )
          .sort((a, b) => b.question_helpfulness - a.question_helpfulness)
          .slice(0, displayedQuestions)
          .map((question) => (
            <Question
              key={question.question_id}
              question={question}
              getQuestions={getQuestions}
              setQuestions={setQuestions}
              productName={productName}
            />
          ))}
      </div>

      <div className="questions-navigation d-flex flex-wrap gap-3">
        {!hideButton && (
          <button
            className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap ps-0"
            onClick={handleLoadMoreQuestions}
          >
            More Questions
          </button>
        )}

        {!moreIsHidden && (
          <div className="d-flex flex-wrap gap-3">
            {!hidePreviousPage && (
              <button
                className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
                onClick={handlePreviousPage}
              >
                Previous Page
              </button>
            )}
            {!hideNextPage && (
              <button
                className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
                onClick={handleNextPage}
              >
                Next Page
              </button>
            )}
            <button
              className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
              onClick={resetDisplayedQuestions}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};

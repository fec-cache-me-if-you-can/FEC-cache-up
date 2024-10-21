import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import SearchQuestions from './SearchQuestions.jsx';
import Question from './Question.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import AddQuestion from './AddQuestion.jsx';

export default function QuestionsList({ productId }) {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState('');
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [moreIsHidden, setMoreIsHidden] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideNextPage, setHideNextPage] = useState(false);
  const [hidePreviousPage, setHidePreviousPage] = useState(true);

  useEffect(() => {
    getQuestions(productId)
      .then((result) => setQuestions(result.data.results))
      .catch((err) => console.log(err));
  }, [productId]);

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
  }, [currentPage, productId]);

  useEffect(() => {
    currentPage > 1 ? setHidePreviousPage(false) : setHidePreviousPage(true);
  }, [currentPage]);

  useEffect(() => {
    getQuestions(productId, currentPage)
      .then((result) => setQuestions(result.data.results))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const updateQuery = (value) => setQuery(value);

  const handleLoadMoreQuestions = () => {
    setDisplayedQuestions(10);
  };

  const getQuestions = (product_id, page = 1, count = 10) => {
    return axios.get(
      `/qa/questions?product_id=${product_id}&page=${page}&count=${count}`,
    );
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
    <div className="question-list container-xl ">
      <div className="d-flex">
        <SearchQuestions update={updateQuery} />
        <PrimaryButton
          isDisabled={hideButton}
          label={'More Questions'}
          plus={true}
          onClick={handleLoadMoreQuestions}
          extraStyles={'m-3'}
        />
        <AddQuestion onClick={createQuestion} />
      </div>
      {!query.length
        ? questions
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness)
            .slice(0, displayedQuestions)
            .map((question) => {
              return (
                <Question key={question.question_id} question={question} />
              );
            })
        : questions
            .reduce((acc, question) => {
              console.log(acc);
              console.log(question.question_body.toLowerCase());
              if (
                question.question_body
                  .toLowerCase()
                  .includes(query.toLowerCase())
              ) {
                acc.push(question);
              }
              return acc;
            }, [])
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness)
            .slice(0, displayedQuestions)
            .map((question) => {
              return (
                <Question key={question.question_id} question={question} />
              );
            })}
      {!moreIsHidden && (
        <div className="d-inline-flex">
          {!hidePreviousPage && (
            <button
              hidden={hidePreviousPage}
              className="d-inline-flex d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
              onClick={handlePreviousPage}
            >
              previous page
            </button>
          )}
          {!hideNextPage && (
            <button
              hidden={hideNextPage}
              className="d-inline-flex d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
              onClick={handleNextPage}
            >
              next page
            </button>
          )}
          <button
            className="d-inline-flex d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
            onClick={resetDisplayedQuestions}
          >
            Hide More Questions
          </button>
        </div>
      )}
    </div>
  );
}
QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
};

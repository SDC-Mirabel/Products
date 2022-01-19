import React from 'react';
import axios from 'axios';
import { AppContext } from '../AppProvider.jsx';

import QuestionsList from './QuestionsList.jsx';
import SearchBar from './SearchBar.jsx';
import MoreAnsweredQs from './MoreAnsweredQs.jsx';
import AddQuestion from './AddQuestion.jsx';
import Question from './Question.jsx';


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: [],
      questions: [],
      filtered: [],
      count: 1,
      productId: 40344,
      productName: '',
      query: '',
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.getProdName = this.getProdName.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchOnInput = this.searchOnInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.sort = this.sort.bind(this);
  }

  static contextType = AppContext;

  componentDidMount() {
    this.getAllQuestions(this.state.productId, this.state.count);
    this.getQuestions(this.state.productId);
    this.getProdName(this.state.productId);
  }

  sort = (answers) => {
    let arrayCopy = answers.slice();
    arrayCopy.sort((a, b) => (a[1].helpfulness > b[1].helpfulness) ? -1 : 1);
    arrayCopy.sort((a) => (a[1].name === 'Seller') ? -1 : 1);
    // setAnswers(arrayCopy);
    return arrayCopy;
  }

  handleDelete = (e) => {
    let questionsCopy = this.state.allQuestions.slice(0, 4);
    console.log('questionsCopy: ', questionsCopy);
    console.log('query: ', this.state.query);
    // var filterQs = this.filterQuestions();
    console.log('filtered in handleSubmit', filterQs);
    if (this.state.query === '' || this.state.query.length < 3){
      this.setState({
        questions: questionsCopy
      })
    }
  }

  searchOnInput = (e) => {
    let questionsCopy = this.state.allQuestions.slice(0, 4);
    var filterQs = this.filterQuestions();
    console.log('filtered in handleSubmit', filterQs);
    if (filterQs && this.state.query.length >= 3) {
      this.setState({
        questions: filterQs
      });
    } else {
      this.setState({
        questions: questionsCopy
      })
    }
  }

  handleSubmit = (e) => {
    let questionsCopy = this.state.allQuestions.slice(0, 4);
    e.preventDefault();
    var filterQs = this.filterQuestions();
    console.log('filtered in handleSubmit', filterQs);
    if (filterQs) {
      this.setState({
        questions: filterQs
      });
    } else {
      this.setState({
        questions: questionsCopy
      })
    }
  }

   filterQuestions = () => {
    var query = this.state.query.toLowerCase();
    console.log('query', query);
    if (query) {
      var filteredQs = this.state.allQuestions.filter(question =>
        question.question_body.toLowerCase().includes(query));
    }
    console.log('filtered', filteredQs);
    return filteredQs;
  }

  handleInput = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  getProdName = (product_id) => {
    console.log('Getting Product Name...')
    axios.get('/products/' + product_id, {
      responseType: 'json',
    })
    .then((response) => {
      this.setState({
        productName: response.data.name
      })
      console.log('the response from getProdName Q&A',response.data);
    })
    .catch((err) => {
      console.error('Error! from getProdName ', err);
    });
  }

  getAllQuestions = (id, page) => {
    axios.get('/qa/questions', {
      params: { id, page },
      responseType: 'json',
    })
    .then((response) => {
      if (response.data.results.length === 0) {
        return;
      }
      if (response.data.results.length) {
        this.getAllQuestions(this.state.productId, this.state.count)
      }
      response.data.results.map(question =>
        this.setState({
          allQuestions: [...this.state.allQuestions, question],
        }));
    })
    .then(() => {
      this.setState({ count: this.state.count += 1 })
    })
    .catch((err) => {
      console.error('Error! ', err);
    });
  }


  getQuestions = (id) => {
    let page = 1;
    axios.get('/qa/questions', {
      params: { id, page },
      responseType: 'json',
    })
    .then((response) => {
      console.log('Response in Q&A: ', response);
      this.setState({
        questions: response.data.results
      })
    })
    .catch((err) => {
      console.error('Error! ', err);
    });
  }

  render() {
    return (
      <>
        <SearchBar allQuestions={this.state.allQuestions} handleInput={this.handleInput} handleSearch={this.filterQuestions} handleSubmit={this.handleSubmit} searchOnInput={this.searchOnInput} handleDelete={this.handleDelete}/>
        <div className='questions-answers'>
          <div className='questions-list'>
            <QuestionsList prodId={this.state.productId}sort={this.sort} filtered={this.state.filtered} questions={this.state.questions} prodName={this.state.productName}/>
          </div>
            {this.state.allQuestions.length ?
              <>
                <MoreAnsweredQs prodId={this.state.productId} />
                <AddQuestion prodId={this.state.productId} prodName={this.state.productName}/>
              </>
              : <div>
                  <AddQuestion prodId={this.state.productId} prodName={this.state.productName}/>
                </div>
            }
        </div>
      </>
    );
  }
};

export default QuestionsAndAnswers;
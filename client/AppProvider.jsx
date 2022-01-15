import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = (props) => {

  const [productId, setProductId] = useState(40344);

  const [clickEventArray, setClickEventArray] = useState([]);
  let parentElement = '';

  const recursionToFindParentElement = (target) => {
    if (target.id === 'container') {
      console.log('found container');
      return;
    }
    if (target.id === 'ratings-reviews') {
      // console.log('found Ratings & Reviews');
      parentElement = 'Ratings & Reviews';
      return;
    }
    if (target.id === 'product-overview') {
      // console.log('found Product Overview');
      parentElement = 'Product Overview';
    }
    if (target.id === 'related-products') {
      // console.log('found Related Products');
      parentElement = 'Related Products';
    }
    if (target.id === 'questions-answers') {
      // console.log('found Questions & Answers');
      parentElement = 'Questions & Answers';
    }
    recursionToFindParentElement(target.parentElement);
  };

  const wasIClicked = (e) => {
    parentElement = '';
    let time = new Date();
    let element = e.target;
    recursionToFindParentElement(e.target.parentElement);
    // let objToStore = {
    //   time: time,
    //   target: e.target,
    //   module: parentElement
    // };
    axios.post('interactions', {
      'time': time,
      'element': e.target.tagName,
      'widget': parentElement
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    // clickEventArray.push(objToStore);
    // setClickEventArray(clickEventArray);
    // console.log(clickEventArray);
  };

  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        const id = res.data[0].id;
        // console.log('products', res.data, id);
        setProductId(40344);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={[productId, setProductId, wasIClicked]}>
      {props.children}
    </AppContext.Provider>
  );
};

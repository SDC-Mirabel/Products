import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppProvider.jsx';


let ImportStarsForRelated = ({rating, module}) => {
  // let [rateAverage, setRateAverage] = useState(Number(rating / 20).toFixed(1));

  const [productId, setProductId] = useContext(AppContext);

  let stripArray = ['reviewStarsFill', 'reviewStarsFill75', 'reviewStarsFill50', 'reviewStarsFill25'];



  let classStripper = (elem, classArray) => {
    classArray.forEach(function(item) {
      elem.classList.remove(item);
    });
  };

  let fillStars = (averageRating) => {

    const star5 = document.getElementById(`5star${module}`);
    const star4 = document.getElementById(`4star${module}`);
    const star3 = document.getElementById(`3star${module}`);
    const star2 = document.getElementById(`2star${module}`);
    const star1 = document.getElementById(`1star${module}`);

    classStripper(star5, stripArray);
    classStripper(star4, stripArray);
    classStripper(star3, stripArray);
    classStripper(star2, stripArray);
    classStripper(star1, stripArray);
    if (averageRating === 5) {
      star5.classList.add('reviewStarsFill');
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 5 && averageRating > 4.5) {
      star5.classList.add('reviewStarsFill75');
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 4.5) {
      star5.classList.add('reviewStarsFill50');
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 4.5 && averageRating > 4) {
      star5.classList.add('reviewStarsFill25');
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 4) {
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 4 && averageRating > 3.5) {
      star4.classList.add('reviewStarsFill75');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 3.5) {
      star4.classList.add('reviewStarsFill50');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 3.5 && averageRating > 3) {
      star4.classList.add('reviewStarsFill25');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 3) {
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 3 && averageRating > 2.5) {
      star3.classList.add('reviewStarsFill75');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 2.5) {
      star3.classList.add('reviewStarsFill50');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 2.5 && averageRating > 2) {
      star3.classList.add('reviewStarsFill25');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 2) {
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 2 && averageRating > 1.5) {
      star2.classList.add('reviewStarsFill75');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 1.5) {
      star2.classList.add('reviewStarsFill50');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 1.5 && averageRating > 1) {
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (averageRating === 1) {
      star1.classList.add('reviewStarsFill');
    } else if (averageRating < 1 && averageRating > 0.5) {
      star1.classList.add('reviewStarsFill75');
    } else if (averageRating === 0.5) {
      star1.classList.add('reviewStarsFill50');
    } else if (averageRating < 0.5) {
      star1.classList.add('reviewStarsFill25');
    } else {
      return;
    }
  };


  let setStars = (num) => {
    fillStars(num);
  };

  useEffect(() => {
    const ratingForRelated = Number(rating / 20).toFixed(1);
    console.log(Number(ratingForRelated));
    setStars(Number(ratingForRelated));
  }, []);

  return (

    <div className="reviewStarsContainer">
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`1star${module}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`2star${module}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`3star${module}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`4star${module}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`5star${module}`} className="fas fa-star"></i>
        </div>
      </div>
    </div>

  );


};



export default ImportStarsForRelated;
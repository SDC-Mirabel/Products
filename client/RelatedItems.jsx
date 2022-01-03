import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RelatedModal from './RelatedItems/RelatedModal';
import Cards from './RelatedItems/Cards';
import OutfitCards from './RelatedItems/OutfitCards';


var Related = () => {
  const [x, setX] = useState(0);
  const [x2, setX2] = useState(0);
  const [relPictures, setRelPictures] = useState([]);
  const [relReviews, setRelReviews] = useState([]);
  const [relProdId, setRelProdId] = useState([]);
  const [initialId, setInitialId] = useState(40344);
  const [completeRelated, setCompleteRelated] = useState([]);
  const [doneLoading, setDoneLoading] = useState(0);
  const [showModal, setShowModal] = useState('hidden');


  const stylesRelated = {
    transform: `translate(${x}px, 0px)`
  };
  const stylesOutfit = {
    transform: `translate(${x2}px, 0px)`
  };

  const modalView = {
    visibility: `${showModal}`
  };

  let showState = () => {
    var temp = completeRelated;
    for (var i = 0; i < temp.length; i++) {
      temp[i]['reviews'] = relReviews[i];
      temp[i]['picture'] = relPictures[i];
    }
    setCompleteRelated(temp);
    setX(x + 1);
    setX(0);
    //console.log(completeRelated);
  };

  //averages reviews from metadata
  let reviewAverage = (revs) => {
    let totalNum = 0;
    let revProduct = 0;
    let keys = Object.keys(revs);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      totalNum += parseInt(revs[key]);
      revProduct += parseInt(key) * revs[key];
    }
    //console.log("totalNum: ", totalNum, " Product: ", revProduct);
    let average = ((revProduct / totalNum) / 5);
    return average.toFixed(2);
  };



  //takes product's metadata, and averages out review
  let getMeta = (id, index, cb) => {
    axios.get(`/reviews/${id}/meta`)
      .then((res) => {
        let obj = res.data.ratings;
        let temp = relReviews;
        temp[index] = (reviewAverage(obj));
        setRelReviews(temp);
      })
      .then(() => {
        cb();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //grabs product thumbnail
  let getPicture = (id, index, cb) => {
    axios.get(`products/${id}/styles`)
      .then((res) => {
        let tempPics = relPictures;
        tempPics[index] = (res.data.results[0].photos[0].thumbnail_url);
        setRelPictures(tempPics);
      })
      .then(() => {
        cb(id, index, showState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //grabs product name, category, and price
  let getInfo = (id, index) => {
    axios.get(`products/${id}`)
      .then((res) => {
        var temp = completeRelated;
        temp[index] = {
          name: res.data.name,
          category: res.data.category,
          price: res.data.default_price,
          features: res.data.features
        };
        setCompleteRelated(temp);
      })
      .then(() => {
        getPicture(id, index, getMeta);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //takes all id's related to initial one, then runs them through necessary requests
  let getData = (id, cb) => {
    axios.get(`products/${id}/related`)
      .then((res) => {
        let index = 0;
        let temp = res.data;
        temp.map(num => {
          getInfo(num, index);
          index++;
        });
        getInfo(res.data[0]);
        setRelProdId(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(() => {

    getData(initialId, showState);

  }, [doneLoading] );

  //left for the carousels needs a function so they don't go further to the left than possible
  var moveLeft = function() {
    if (x < 0) {
      setX(x + 340);
      //showState();
    }
  };

  var moveLeftOutfit = function() {
    if (x2 < 0) {
      setX2(x2 + 340);
    }
  };


  //changes the state of the hook responsible for modal visibility
  //marked for deletion because all modals depending on the same hook is bad
  var modalHide = function () {
    if (showModal === 'hidden') {
      setShowModal('visible');
    } else {
      setShowModal('hidden');
    }
  };

  return (
    <div>
      <i class="fas fa-arrow-right rArrow" onClick={()=>setX(x - 340)}></i>
      <i class="fas fa-arrow-left lArrow" onClick={()=>moveLeft()}></i>
      <div className="reel"style={stylesRelated}>
        {completeRelated.length > 0 ? completeRelated.map((data) =>
          <div>
            <Cards data={data} show={modalHide}/>
          </div>
        ) : <Cards/>}
      </div>
      <i className="lArrow" class="fas fa-arrow-left lArrow2" onClick={()=> moveLeftOutfit()}></i>
      <i className="rArrow" class="fas fa-arrow-right rArrow2" onClick={()=>setX2(x2 - 340)}></i>
      <div className="reel"style={stylesOutfit}>
        <OutfitCards/>
      </div>
    </div>
  );
};




export default Related;
import React, {useState, useEffect, useContext, createContext} from 'react';
import { AppContext } from '../AppProvider.jsx';
import { resetSelectedStyle, sortSizes } from './OverviewHelper.jsx';
import axios from 'axios';

export const OverviewContext = createContext();

export const OverviewProvider = (props) => {

  const [productId, setProductId] = useContext(AppContext);

  const defaultProduct = {
    id: '',
    category: '',
    name: '',
    slogan: '',
    description: '',
    'style_name': '',
    'original_price': '',
    'sale_price': '',
    photos: [],
    sizes: [],
    'all_styles': []
  };

  const [product, setProduct] = useState(defaultProduct);
  let productPending;

  const updateProduct = (index) => {
    productPending = Object.assign({}, product);
    resetSelectedStyle(productPending.all_styles);
    const selectedStyle = productPending.all_styles[index];
    selectedStyle.selected = true;
    productPending['style_name'] = selectedStyle.name;
    productPending['sizes'] = sortSizes(selectedStyle);
    productPending['photos'] = selectedStyle.photos;
    productPending['original_price'] = selectedStyle.original_price;
    productPending['sale_price'] = selectedStyle.sale_price;
    setProduct(productPending);
  };

  useEffect(() => {
    if (productId === null) {
      return;
    } else {
      axios.get(`/products/${productId}`)
        .then((res) => {
          productPending = Object.assign({}, res.data);
          const id = productPending.id;
          return axios.get(`/products/${id}/styles`);
        })
        .then((res) => {
          productPending['all_styles'] = res.data.results;
          resetSelectedStyle(productPending['all_styles']);
          const selectedStyle = productPending['all_styles'][0];
          selectedStyle.selected = true;
          productPending['style_name'] = selectedStyle['name'];
          productPending['sizes'] = sortSizes(selectedStyle);
          productPending['photos'] = selectedStyle.photos;
          productPending['original_price'] = selectedStyle.original_price;
          productPending['sale_price'] = selectedStyle.sale_price;
          setProduct(productPending);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  return (
    <OverviewContext.Provider value={[product, updateProduct]}>
      {props.children}
    </OverviewContext.Provider>
  );
};
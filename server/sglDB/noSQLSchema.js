// Document Products:Info
/*
for each product
{
  id: unique int,
  name: char,
  slogan: char,
  description: char
  default_price: char
  features: [
    {feature: char, value: char}, {},{} etc...
  ],
  id_styles: [set of unique ids from styles document],
  related: [set of unique product ids]
}
*/




// Document Products:Styles
/*

for each unique style
{
  id: unique int,
  name: char,
  original_price: char,
  sale_price: char,
  default?: boolean,
  photos: [{
    thumbnail_url: char,
    url: char
  }],
  skus: {
    valString: {
      quantity: int,
      size: char
    },
    {},{}... etc
  }
}

*/
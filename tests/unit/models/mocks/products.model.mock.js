const allProductsResponse = [
  {id:1,name:'Martelo de Thor'},
  {id:2,name:'Traje de encolhimento'},
  {id:3,name:'Escudo do Capitão América'},
];

const productCreateResponse = { id: 4, name: 'Produto1' };

const validProductName = 'Produto1';
const validProductId = 1;
const notExistingProductId = 9999;

module.exports = {
  allProductsResponse,
  productCreateResponse,
  validProductName,
  validProductId,
  notExistingProductId,
};
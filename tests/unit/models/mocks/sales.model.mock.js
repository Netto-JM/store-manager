const allSalesResponse = [{
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2023-03-28T22:03:27.000Z",
  },
];

const allSalesMock = [{
    "sale_id": 1,
    "product_id": 1,
    "quantity": 5,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "sale_id": 1,
    "product_id": 2,
    "quantity": 10,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "sale_id": 2,
    "product_id": 3,
    "quantity": 15,
    "date": "2023-03-28T22:03:27.000Z",
  },
];

const singleSaleResponse = [{
    "productId": 1,
    "quantity": 5,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2023-03-28T22:03:27.000Z",
  },
];

const singleSaleMock = [{
    "product_id": 1,
    "quantity": 5,
    "date": "2023-03-28T22:03:27.000Z",
  },
  {
    "product_id": 2,
    "quantity": 10,
    "date": "2023-03-28T22:03:27.000Z",
  },
];

module.exports = {
  allSalesMock,
  allSalesResponse,
  singleSaleMock,
  singleSaleResponse,
};
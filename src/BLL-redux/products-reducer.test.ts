import {
  addProductAC,
  changeProductStatusAC,
  deleteProductAC,
  productsReducer,
  ProductType,
} from './products-reducer';

let startState: Array<ProductType> = [];

beforeEach(() => {
  startState = [
    {
      id: '1',
      title: 'phone',
      price: 690,
      urlImg: 'http//',
      inCart: false,
      count: 0,
    },
    {
      id: '2',
      title: 'laptop',
      price: 900,
      urlImg: 'http//',
      inCart: false,
      count: 0,
    },
  ];
});

test('count of correct product should be decreased', () => {
  const endState = productsReducer(startState, deleteProductAC({ id: '2' }));

  expect(endState[1].count).toBe(-1);
  // check if another product has changed
  expect(endState[0].count).toBe(0);
});
test('count of correct product should be increased', () => {
  const endState = productsReducer(startState, addProductAC({ id: '1' }));

  expect(endState[0].count).toBe(1);
  // check if another product has changed
  expect(endState[1].count).toBe(0);
});
test('correct status of product should be changed', () => {
  const endState = productsReducer(startState, changeProductStatusAC({ id: '1' }));

  expect(endState[0].inCart).toBe(true);
  // check if another product has changed
  expect(endState[1].inCart).toBe(false);
});

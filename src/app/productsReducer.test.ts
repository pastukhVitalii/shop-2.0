/*import {addProductAC, productsReducer, ProductType} from "./productsReducer";

let startState: Array<ProductType> = [];

beforeEach(() => {
    startState = [
        {id: '1', title: 'Asus', price: 10000, count: 0, urlImg: 'ds'},
        {id: '0', title: 'Apple', price: 9000, count: 0, urlImg: 'ds'}
    ]
})

test('count should be 1', () => {
    // const action = productsReducer(startState, addProductAC({products: startState}));

    const endState = productsReducer(startState, addProductAC({products: startState}));
    // eslint-disable-next-line jest/valid-expect
    expect(endState[0].count)
} );

test('get products', () => {
    // const action = productsReducer(startState, addProductAC({products: startState}));

    const endState = productsReducer(startState, addProductAC({products: startState}));
    // eslint-disable-next-line jest/valid-expect
    expect(endState[0])
} )*/

export let s = 32;
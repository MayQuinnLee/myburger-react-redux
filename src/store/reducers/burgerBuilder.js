import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_ING:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
            }
        case actionTypes.REMOVE_ING:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
            }
        case actionTypes.SET_ING:
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese,
                },
                error: false,
                totalPrice: 4
            }
        case actionTypes.FETCH_ING_FAILED:
            return{
                ...state,
                error: true
            }
        default: 
            return state
    }
}

export default reducer;


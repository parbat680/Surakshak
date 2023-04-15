import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    allProducts: [],
    searchproducts: [],


    buttons: {
        searchButton: false,
    }
}


export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            console.log("Called from products reducer")
            return { ...state, allProducts: payload };
        case ActionTypes.SEARCH_ALL_PRODUCTS:
            console.log("The payload: ", payload)
            return {
                ...state,
                searchproducts: state.allProducts.filter((item) => item.name.toLowerCase().includes(payload.toLowerCase()) || item.description.toLowerCase().includes    (payload.toLowerCase()) ),
                buttons: { ...state.buttons, searchButton: true },
            };


        case ActionTypes.SET_STATIONERY:
            console.log("Called from products reducer")
            return { ...state, stationery: state.allProducts.filter((item) => item.category === "Stationery and Equipments"), buttons: { ...state.buttons, filterButton: true } };
        case ActionTypes.REMOVE_FILTER:
            console.log("Called from products reducer")
            return { ...state, buttons: { ...state.buttons, filterButton: false } };
        default:
            return state;
    }
}
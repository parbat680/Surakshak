import { ActionTypes } from "../constants/actionTypes"

export const setProducts = (products) => ({
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
});

export const searchAllProducts = (search) => {
    return {
        type: ActionTypes.SEARCH_ALL_PRODUCTS,
        payload: search
    }
}

export const setStationery = () => ({
    type: ActionTypes.SET_STATIONERY,
});

export const removeFilter = () => ({
    type: ActionTypes.REMOVE_FILTER
})


export const setFoods = (foods) => ({
    type: ActionTypes.SET_PRODUCTS,
    payload: foods,
});
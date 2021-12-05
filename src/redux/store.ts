import { configureStore } from "@reduxjs/toolkit";

const initialState: any = [];

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_PERSON':
            return state.concat(action.data);
        case 'DELETE_PERSON':
            return state.filter((item: any) => item.id !== action.data);
        case 'UPDATE_PERSON':
            return state.map((item: any) => {
              if(item.id === action.id) {
                return {
                   ...item,
                   name:action.data.name,
                   email:action.data.email,
                   username:action.data.username,
                }
              } else return item;
            })
        default:
            return state;
    }
}

export const store = configureStore({reducer});
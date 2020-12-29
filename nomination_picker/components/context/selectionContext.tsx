import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import React, { createContext, useReducer } from "react";

export type Movie = {
    name: string;
}

export type InitialStateType = {
    selectedMovie: Movie;
}

export enum ActionTypes {
    Set = 'SET_SELECTION',
    Remove = 'DELETE_PRODUCT',
}

const initialState = { selectedMovie: null }
const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.Set:
            return {
                ...state,
                selectedMovie: action.payload.movie
            };
        case ActionTypes.Remove:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

const SelectionContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

const SelectionProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SelectionContext.Provider value={{ state, dispatch }} children={props.children}/>
    );
}
export { SelectionContext, SelectionProvider };
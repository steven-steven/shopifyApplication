import React, { createContext, useReducer } from "react";

export type Movie = {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

export type InitialStateType = {
  selectedMovie: Movie;
  nominationList: Movie[];
}

export enum ActionTypes {
  View = 'SET_SELECTION',
  RemoveNomination = 'REMOVE_NOMINATION',
  SetNomination = 'SET_NOMINATION',
}

const initialState = { selectedMovie: null, nominationList: [] }
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.View:
      return {
        ...state,
        selectedMovie: action.payload.movie
      };
    case ActionTypes.RemoveNomination:
      return {
        ...state,
        nominationList: state.nominationList.filter(item => item.id !== action.payload.idToDelete)
      };
    case ActionTypes.SetNomination:
      return {
        ...state,
        nominationList: [...state.nominationList, state.selectedMovie]
      };
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
    <SelectionContext.Provider value={{ state, dispatch }} children={props.children} />
  );
}

export { SelectionContext, SelectionProvider };
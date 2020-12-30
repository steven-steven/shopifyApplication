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
  reachedMaxNominationWarning: boolean;
  hasMaxNominationError: boolean;
}

export enum ActionTypes {
  View = 'SET_SELECTION',
  RemoveNomination = 'REMOVE_NOMINATION',
  SetNomination = 'SET_NOMINATION',
  CloseMsgBanner = 'CLOSE_BANNER',
}

export const MAX_NOMINATION = 5;

const initialState = { selectedMovie: null, nominationList: [], hasMaxNominationError: false, reachedMaxNominationWarning: false }
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
        hasMaxNominationError: false,
        reachedMaxNominationWarning: false,
        nominationList: state.nominationList.filter(item => item.id !== action.payload.idToDelete)
      };
    case ActionTypes.SetNomination:
      if (state.nominationList.length == MAX_NOMINATION) {
        // reach limit. don't add
        return {
          ...state,
          hasMaxNominationError: true
        };
      }
      return {
        ...state,
        reachedMaxNominationWarning: state.nominationList.length + 1 == MAX_NOMINATION,
        nominationList: [...state.nominationList, state.selectedMovie]
      };
    case ActionTypes.CloseMsgBanner:
      return {
        ...state,
        reachedMaxNominationWarning: false,
        hasMaxNominationError: false,
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
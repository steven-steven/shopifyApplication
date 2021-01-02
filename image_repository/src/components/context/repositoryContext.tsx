import React, { createContext, useReducer } from "react";

export type Image = {
  id: string;
  src: string;
  thumbnail: string;
  caption: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  customOverlay?: React.ReactNode;
  isSelected?: boolean;
}

export type InitialStateType = {
  selectedPicsId: string[];
  userImages: Image[];
}

export enum ActionTypes {
  SELECT_PIC_IDS = 'SELECT_PIC_IDS',
  DESELECT_PIC_IDS = 'DESELECT_PIC_IDS',
  SET_USER_IMAGES = 'SET_USER_IMAGES',
}

const initialState = { selectedPicsId: [], userImages: [] }
const reducer = (state, action) => {
  console.log(action.type);
  const nextState = { ...state };
  switch (action.type) {
    case ActionTypes.SELECT_PIC_IDS:
      nextState.selectedPicsId.push(action.payload.id);
      nextState.userImages[action.payload.index].isSelected = true;
      break;
    case ActionTypes.DESELECT_PIC_IDS:
      nextState.selectedPicsId = state.selectedPicsId.filter((id) => id !== action.payload.id)
      nextState.userImages[action.payload.index].isSelected = false;
      break;
    case ActionTypes.SET_USER_IMAGES:
      return {
        ...state,
        userImages: action.payload,
        selectedPicsId: []
      };
    default:
      return state;
  }
  return nextState
};

const RepositoryContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const RepositoryProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <RepositoryContext.Provider value={{ state, dispatch }} children={props.children} />
  );
}

export { RepositoryContext, RepositoryProvider };
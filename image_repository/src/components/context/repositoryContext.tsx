import React, { createContext, useReducer } from "react";
import { BsImages } from "react-icons/bs";

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
  isSelectedAll: boolean;
}

export enum ActionTypes {
  SELECT_PIC_IDS = 'SELECT_PIC_IDS',
  DESELECT_PIC_IDS = 'DESELECT_PIC_IDS',
  SET_USER_IMAGES = 'SET_USER_IMAGES',
  HANDLE_SELECT_ALL = 'HANDLE_SELECT_ALL'
}

const initialState = { selectedPicsId: [], userImages: [], isSelectedAll: false }
const reducer = (state, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ActionTypes.SELECT_PIC_IDS:
      nextState.selectedPicsId.push(action.payload.id);
      nextState.userImages[action.payload.index].isSelected = true;
      nextState.isSelectedAll = nextState.selectedPicsId.length == nextState.userImages.length;
      break;
    case ActionTypes.DESELECT_PIC_IDS:
      nextState.selectedPicsId = state.selectedPicsId.filter((id) => id !== action.payload.id)
      nextState.userImages[action.payload.index].isSelected = false;
      nextState.isSelectedAll = false;
      break;
    case ActionTypes.SET_USER_IMAGES:
      return {
        ...state,
        userImages: action.payload,
        selectAllChecked: false,
        selectedPicsId: []
      };
    case ActionTypes.HANDLE_SELECT_ALL:
      const newSelectedPicsId = [];
      nextState.userImages = nextState.userImages.map((img) => {
        img.isSelected = action.payload.selectAllChecked;
        if (action.payload.selectAllChecked) newSelectedPicsId.push(img.id);
        return img;
      });
      nextState.isSelectedAll = action.payload.selectAllChecked;
      nextState.selectedPicsId = newSelectedPicsId;
      break;
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
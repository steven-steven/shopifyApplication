import React, { useContext } from 'react'
import { SelectionContext, InitialStateType, ActionTypes } from './context/selectionContext'

const BANNER_TYPE = {
  REACHED_MAX_WARNING: "reached_warning",
  MAX_ERROR: "max_error"
}
const MESSAGE = {
  [BANNER_TYPE.REACHED_MAX_WARNING]: "You've picked 5 and you're done!",
  [BANNER_TYPE.MAX_ERROR]: "You have reached the maximum selections (5). Please delete a nomination and try again!"
}
const COLOR_CLASS = {
  [BANNER_TYPE.REACHED_MAX_WARNING]: "bg-green-300 border-green-600",
  [BANNER_TYPE.MAX_ERROR]: "bg-red-300 border-red-800"
}

const MessageBanner = () => {

  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);
  const closeBanner = () => dispatch({ type: ActionTypes.CloseMsgBanner });

  let bannerType = null;
  if (state.hasMaxNominationError) bannerType = BANNER_TYPE.MAX_ERROR;
  else if (state.reachedMaxNominationWarning) bannerType = BANNER_TYPE.REACHED_MAX_WARNING;

  if (bannerType == null) return (<></>);
  return (
    <div className='absolute bottom-5 left-5' onClick={closeBanner}>
      <div className={`${COLOR_CLASS[bannerType]} py-3 px-8 border-l-8`}> {MESSAGE[bannerType]} </div>
    </div>
  );
}
export default MessageBanner;
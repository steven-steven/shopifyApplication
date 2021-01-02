import React, { useContext, useMemo } from 'react'
import { SelectionContext, InitialStateType, ActionTypes } from './context/selectionContext'

const DetailSection = () => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);

  const addSelectedToNomination = () => dispatch({ type: ActionTypes.SetNomination });

  const nominationIds = useMemo(() => state.nominationList.map(i => i.id), [state.nominationList]);
  const isAlreadyInNomination = state.selectedMovie && nominationIds.includes(state.selectedMovie.id);

  if (!state.selectedMovie) return (<></>)
  return (
    <div className='text-white bg-gray-800 h-72'>
      {state.selectedMovie && (
        <div className='flex flex-row h-full'>
          <img className='h-full max-w-xs' src={state.selectedMovie.poster} alt="poster" />
          <div className='flex flex-col flex-grow'>
            <div className='flex-grow p-3'>
              <p className='pb-3 font-bold text-center'>{state.selectedMovie.title}</p>
              <p>Year: {state.selectedMovie.year}</p>
              <p>Type: {state.selectedMovie.type}</p>
            </div>
            <button
              className='px-3 py-2 m-1 text-white transition-colors duration-150 bg-blue-500 rounded-lg disabled:opacity-10 disabled:hover:none'
              onClick={addSelectedToNomination}
              disabled={isAlreadyInNomination}
            >
              Add to Your Nomination List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default DetailSection;
import React, { useContext, useMemo } from 'react'
import { SelectionContext, InitialStateType, ActionTypes } from './context/selectionContext'
import { CgChevronDoubleDownR } from 'react-icons/cg';

const DetailSection = () => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);

  const addSelectedToNomination = () => dispatch({ type: ActionTypes.SetNomination });

  const nominationIds = useMemo(() => state.nominationList.map(i => i.id), [state.nominationList]);
  const isAlreadyInNomination = state.selectedMovie && nominationIds.includes(state.selectedMovie.id);

  if (!state.selectedMovie) return (<></>)
  return (
    <div className='h-72 bg-gray-800 text-white'>
      {state.selectedMovie && (
        <div className='flex flex-row h-full'>
          <img className='h-full max-w-xs' src={state.selectedMovie.poster} alt="poster" />
          <div className='flex-grow flex flex-col'>
            <div className='flex-grow p-3'>
              <p className='font-bold text-center pb-3'>{state.selectedMovie.title}</p>
              <p>Year: {state.selectedMovie.year}</p>
              <p>Type: {state.selectedMovie.type}</p>
            </div>
            <button
              className='disabled:opacity-10 disabled:hover:none m-1 py-2 px-3 text-white transition-colors duration-150 bg-blue-500 rounded-lg'
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
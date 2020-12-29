import React, { useContext, useMemo } from 'react'
import { SelectionContext, InitialStateType, ActionTypes } from './context/selectionContext'
import { CgChevronDoubleDownR } from 'react-icons/cg';

const DetailSection = () => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);

  const addSelectedToNomination = () => dispatch({ type: ActionTypes.SetNomination });

  const nominationIds = useMemo(() => state.nominationList.map(i => i.id), [state.nominationList]);
  const isAlreadyInNomination = state.selectedMovie && nominationIds.includes(state.selectedMovie.id);

  return (
    <div className='border-2 h-72'>
      Detail Section...
      {state.selectedMovie && (
        <div>
          <img className='h-40' src={state.selectedMovie.poster} alt="poster" />
          <h2>{state.selectedMovie.title}</h2>
          {state.selectedMovie.year}
          {state.selectedMovie.type}
        </div>
      )}
      <button
        className='disabled:opacity-50 inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'
        onClick={addSelectedToNomination}
        disabled={isAlreadyInNomination}
      >
        <span>Add to Your Nomination List&nbsp;&nbsp;</span>
        <CgChevronDoubleDownR />
      </button>
    </div>
  );
}
export default DetailSection;
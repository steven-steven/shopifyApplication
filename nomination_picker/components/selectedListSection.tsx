import React, { useContext } from 'react'
import { SelectionContext, InitialStateType, ActionTypes, MAX_NOMINATION } from './context/selectionContext'

const SelectedListSection = () => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);

  const removeFromNomination = (idToDelete) => () => dispatch({ type: ActionTypes.RemoveNomination, payload: { idToDelete } });

  return (
    <div className='border-t-4 border-black flex-grow flex flex-col'>
      <div className='text-xl py-3 text-center w-full bg-gray-300'>
        Your Choice of Movies to Nominate
      </div>
      <ul className={`overflow-y-auto flex-grow ${state.nominationList.length === MAX_NOMINATION ? 'bg-green-100' : ''}`}>
        {state.nominationList.map((nom) => (
          <li
            className='hover:shadow-lg flex justify-center leading-5 border-b-2 py-2 px-3  hover:bg-blue-100'
            key={nom.id}
          >
            <span className='flex-grow text-center'>{`${nom.title} (${nom.year})`}</span>
            <button className='py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-500' onClick={removeFromNomination(nom.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SelectedListSection;
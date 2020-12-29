import React, { useContext } from 'react'
import { SelectionContext, InitialStateType, ActionTypes } from './context/selectionContext'

const SelectedListSection = () => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(SelectionContext);

  const removeFromNomination = (idToDelete) => () => dispatch({ type: ActionTypes.RemoveNomination, payload: { idToDelete } });

  return (
    <div className='border-2 flex-grow'>
      Selected list...
      <ul>
        {state.nominationList.map((nom) => (
          <li
            className='hover:shadow-lg'
            key={nom.id}
          >
            <span>{`${nom.title} (${nom.year})`}</span>
            <button onClick={removeFromNomination(nom.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SelectedListSection;
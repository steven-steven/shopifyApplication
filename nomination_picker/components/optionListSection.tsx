import { useContext } from 'react'
import { SelectionContext, ActionTypes, Movie } from './context/selectionContext'

type inputProps = {
  options: { [key: string]: Movie }
}

const OptionListSection = ({ options }: inputProps) => {
  const { state, dispatch } = useContext(SelectionContext);

  const onSelect = (optionId) => () => {
    dispatch({
      type: ActionTypes.View,
      payload: {
        movie: options[optionId]
      }
    })
  }

  return (
    <div className='border-2 flex-grow bg-gray-100 overflow-y-auto'>
      {!Object.keys(options).length && (<div className='w-full text-center text-xl mt-5'>No Search Result Found :(</div>)}
      <ul>
        {Object.keys(options).map((id) => (
          <li
            className={`cursor-pointer hover:text-blue-400 hover:bg-blue-100 h-12 text-center rounded-md px-2 py-2 my-2 ${state.selectedMovie.id == id ? 'text-blue-400 bg-blue-100' : ''}`}
            onClick={onSelect(id)}
            key={id}
          >
            {`${options[id].title} (${options[id].year})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OptionListSection;
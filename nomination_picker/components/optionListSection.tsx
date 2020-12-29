import { useContext } from 'react'
import { SelectionContext, ActionTypes, Movie } from './context/selectionContext'

type inputProps = {
  options: { [key: string]: Movie }
}

const OptionListSection = ({ options }: inputProps) => {
  const { dispatch } = useContext(SelectionContext);

  const onSelect = (optionId) => () => {
    dispatch({
      type: ActionTypes.View,
      payload: {
        movie: options[optionId]
      }
    })
  }

  return (
    <div className='border-2 flex-grow'>
      Option List...
      <ul>
        {Object.keys(options).map((id) => (
          <li
            className='hover:shadow-lg'
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
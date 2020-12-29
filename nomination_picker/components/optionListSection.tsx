import { useContext } from 'react'
import { SelectionContext, ActionTypes, Movie } from './context/selectionContext'

const OptionListSection = ({options}) => {
    const { dispatch } = useContext(SelectionContext);

    console.log('ops');
    console.log(options)
    const onSelect = (optionId) => {
        dispatch({
            type: ActionTypes.Set,
            payload: {
                movie: options[optionId]
            }
        })
    }

    return(
        <div className='border-2 flex-grow'>
            Option List...
            {Object.keys(options).map((id) => (
                <li>options[id].title</li>
            ))}
        </div>
    );
}
//http://www.omdbapi.com/?i=tt3896198&apikey=99c14cff

export default OptionListSection;
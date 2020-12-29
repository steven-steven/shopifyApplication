import { useContext } from 'react'
import { SelectionContext, InitialStateType } from './context/selectionContext'

const DetailSection = () => {
    const { state }: { state: InitialStateType } = useContext(SelectionContext);

    return(
        <div className='border-2 h-72'>
            Detail Section...
        </div>
    );
}
export default DetailSection;
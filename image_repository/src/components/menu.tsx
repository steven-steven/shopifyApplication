import UploadFileForm from '../components/forms/uploadFileForm';
import { useEffect, useContext, useMemo } from 'react';
import { RepositoryContext, InitialStateType, ActionTypes, Image } from './context/repositoryContext'
import { useStorage } from '../components/hooks/useStorage';
import { BsTrash } from 'react-icons/bs';

const Menu = (): JSX.Element => {
  const { deleteSelectedFiles } = useStorage();
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(RepositoryContext);

  const handleSelectAll = (e) => {
    dispatch({ type: ActionTypes.HANDLE_SELECT_ALL, payload: { selectAllChecked: e.target.checked } });
  }

  return (
    <div>
      <div className='text-3xl text-center'>Menu</div>
      <div className='p-5'>
        <p className='text-xl'>* Upload Image(s)</p>
        <p className='text-sm text-red-800'>Warning: DO NOT upload sensitive pics. This project is a test sandbox and images aren't encrypted at rest. Devs can see your images on the cloud storage 👀 </p>
        <div className='p-4 m-2 border border-black'>
          <UploadFileForm />
        </div>
      </div>
      <div className='p-5'>
        <p className='text-xl'>* Select and Delete Images</p>
        <div className='p-4 m-2 border border-black'>
          <p className='pb-3 mx-1 text-xl'>Selected: {state.selectedPicsId.length}</p>
          <div className='pb-5'>
            <input type="checkbox" className="mx-3 text-indigo-600 form-checkbox" checked={state.isSelectedAll} onClick={handleSelectAll} />
              Select All
            </div>
          <button disabled={state.selectedPicsId.length == 0} onClick={deleteSelectedFiles} className='w-full py-2 bg-red-200 border border-black rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-400'> <BsTrash className='inline mr-3' />Delete</button>
        </div>
      </div>
    </div>
  );
};
export default Menu;
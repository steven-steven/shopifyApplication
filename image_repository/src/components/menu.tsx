import UploadFileForm from '../components/forms/uploadFileForm';
import { useEffect, useContext, useMemo } from 'react';
import { RepositoryContext, InitialStateType, ActionTypes, Image } from './context/repositoryContext'
import { useStorage } from '../components/hooks/useStorage';

const Menu = (): JSX.Element => {
  const { deleteSelectedFiles } = useStorage();
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(RepositoryContext);
  return (
    <div>
      <UploadFileForm />
      <p>Selected: {state.selectedPicsId.length}</p>
      <button onClick={deleteSelectedFiles}>Delete</button>
    </div>
  );
};
export default Menu;
import Gallery from 'react-grid-gallery';
import { useEffect, useContext, useMemo } from 'react';
import { RepositoryContext, InitialStateType, ActionTypes, Image } from './context/repositoryContext'

const CustomGallery = (): JSX.Element => {
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(RepositoryContext);

  const customImageList: Image[] = useMemo(() => state.userImages.map((i) => {
    i.customOverlay = (<div className='absolute bottom-0 w-full p-2 overflow-hidden text-sm text-white bg-gray-800'>
      {i.caption}
    </div>)
    return i;
  }), [state.userImages])

  const onSelectImage = (index, imageObj) => {
    const img = customImageList[index];
    if (img.hasOwnProperty("isSelected") && img.isSelected === true) dispatch({ type: ActionTypes.DESELECT_PIC_IDS, payload: { id: imageObj.id, index } });
    else dispatch({ type: ActionTypes.SELECT_PIC_IDS, payload: { id: imageObj.id, index } });
  }

  return (
    <div className='block w-full'>
      <Gallery images={customImageList} onSelectImage={onSelectImage} lightBoxWidth={1536} backdropClosesModal={true} />
    </div>
  );
};
export default CustomGallery;
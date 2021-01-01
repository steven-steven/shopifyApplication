import Gallery from 'react-grid-gallery';
import { useStorage } from './hooks/useStorage';
import { useEffect, useState, useMemo } from 'react';

const CustomGallery = (): JSX.Element => {
  const { userImages } = useStorage();
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [picsObj, setPicsObj] = useState(userImages);

  // load all images
  // useEffect(() => {
  //   const initializeFiles = async () => {
  //     const res = await listPaginatedFiles();
  //     if (res) {
  //       const imageObjects = res.map((url) => {
  //         return {
  //           src: url,
  //           thumbnail: url,
  //           thumbnailWidth: 320,
  //           thumbnailHeight: 212
  //         }
  //       });
  //       setPicsObj(imageObjects);
  //     }
  //   }
  //   initializeFiles();
  // }, []);

  useEffect(() => {
    userImages.map((i) => {
      i.customOverlay = (<div className='absolute bottom-0 w-full p-2 text-white bg-gray-800 overflow-ellipsis'>
        {i.caption}
      </div>)
    })
    setPicsObj(userImages);
  }, [userImages]);

  const onSelectImage = (index, imageObj) => {
    // make a copy of state and mutate it
    var images = picsObj.slice();

    var img = images[index];
    if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    if (!img.isSelected) setSelectedUrls(selectedUrls.filter(selected => selected !== imageObj.src));
    else setSelectedUrls([...selectedUrls, imageObj.src]);

    console.log(selectedUrls);

    setPicsObj(images);
  }

  return (
    <div>
      <p>selected: {selectedUrls.length}</p>
      <Gallery images={picsObj} onSelectImage={onSelectImage} lightBoxWidth={1536} backdropClosesModal={true} />,
    </div>
  );
};
export default CustomGallery;
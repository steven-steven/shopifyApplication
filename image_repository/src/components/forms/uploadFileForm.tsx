import React, { useEffect, useState } from "react";
import { useStorage } from '../hooks/useStorage';

function UploadFileForm() {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  // Getting the progress and url from the hook
  const { uploadFiles, progress } = useStorage();

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // validate each file
      const newFile = e.target.files[i];
      if (newFile) {
        if (types.includes(newFile.type)) {
          newFiles.push(newFile);
        } else {
          setFiles(null);
          setError("Please select an image file (png or jpg)");
          return;
        }
      }
    }
    setError(null);
    setFiles(newFiles);
  };

  useEffect(() => {
    if (files) uploadFiles(files)
  }, [files]);

  return (
    <div>
      <form>
        <label>
          <input type="file" multiple onChange={handleChange} />
          <span>Upload Images</span>
        </label>
      </form>
      {error && <p>{error}</p>}
      {files && <p>{progress}% uploaded</p>}
    </div>
  );
}

export default UploadFileForm;
import React, { useEffect, useState } from "react";
import { useStorage } from '../hooks/useStorage';

function UploadFileForm() {
  const [uploadedMsg, setUploadedMsg] = useState(null);
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
          setUploadedMsg(null);
          setError("Please select an image file (png or jpg)");
          return;
        }
      }
    }
    uploadFiles(newFiles);
    setUploadedMsg(`uploaded ${newFiles.length} image(s)!`)
    setError(null);
  };

  return (
    <div>
      <form>
        <label>
          <input type="file" multiple onChange={handleChange} />
        </label>
      </form>
      {error && <p>{error}</p>}
      {uploadedMsg && <p>Status: {progress}% uploaded</p>}
      {uploadedMsg && !error && <p>{uploadedMsg}</p>}
    </div>
  );
}

export default UploadFileForm;
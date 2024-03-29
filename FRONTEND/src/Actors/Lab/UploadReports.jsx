import { useState } from 'react';

function UploadDICOM() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    // Handle uploading selectedFiles
    console.log('Uploading files:', selectedFiles);
    // You can send selectedFiles to the server for further processing
  };

  return (
    <div>
      <input
        type="file"
        accept=".dcm,.dicom" // Limit accepted file types to DICOM files
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadDICOM;

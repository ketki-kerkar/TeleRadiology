import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatRoom from '../../Components/ChatRoom';
import Navbar from '../../Components/Navbar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

const OHIFRadiologist = () => {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  
  const [jsonUrl, setJsonUrl] = useState('');
  const [annotatedImageBase64, setAnnotatedImageBase64] = useState('');
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [finalRemarks, setFinalRemarks] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileInputChange = (e) => {
    const newFile = e.target.files[0];

    if (newFile) {
      setFile(newFile);

      getBase64(newFile)
        .then((base64) => {
          setBase64URL(base64);
        })
        .catch((error) => {
          console.error('Error converting file to Base64:', error);
        });
    }
  };

  const handleClickUpload = () => {
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }

      getBase64(file)
        .then((base64) => {
          const formData = {
            annotatedImageBase64: base64,
            caseId: 1,
            finalRemarks: "Recommend clinical correlation and further imaging studies to assess the extent of the lesion identified."
          };
          console.log(formData);

          axios.post('http://localhost:9191/api/v1/radiologist/upload-image-annotated', formData, {
          headers: {
              'Authorization': `Bearer ${authToken}`
            }  
          })
            .then(response => {
              console.log('Upload successful:', response.data);

            })
            .catch(error => {
              console.error('Upload failed:', error);
              if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
              }
              // Handle error (e.g., show an error message)
            });
        })
        .catch((error) => {
          console.error('Error converting file to Base64:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonUrlResponse = await axios.get('http://localhost:9191/api/v1/doctor/get-json-aws-url', {
          params: {
            caseId: 1
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setJsonUrl(jsonUrlResponse.data);

        const annotatedImagesResponse = await axios.get('http://localhost:9191/api/v1/radiologist/get-list-of-annotatedimages', {
          params: {
            caseId: 1
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setAnnotatedImages(annotatedImagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [authToken]);


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
    setImageDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFile(null);
    setFinalRemarks('');
    setBase64URL("");
  };
  
  const handleFinalRemarksChange = (event) => {
    setFinalRemarks(event.target.value);
  };

  return (
    <div style={{ background: '#FFFFFF', overflow: 'hidden' }}>
      <Navbar userRole="doctor" />
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ width: '50vw', height: '90%', position: 'relative', overflow: 'hidden' }}>
          <List>
            {annotatedImages.map((image, index) => (
              <ListItem key={index} button onClick={() => handleImageClick(image)}>
                <ArticleIcon sx={{ fontSize: 48 }} />
                <ListItemText primary={`Report ${index + 1}`} secondary={`Annotator ID: ${image.annotatorId}`} />
              </ListItem>
            ))}
          </List>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70vh', background: '#FFFFFF', overflow: 'hidden' }}>
            <ChatRoom />
          </div>
        </div>
        <div className='dialogbox'>
        <div style={{ flex: '1', overflow: 'hidden' }}>
          <Dialog open={imageDialogOpen} onClose={closeImageDialog}>
            <DialogTitle>Annotated Image Details</DialogTitle>
            <DialogContent>
              {selectedImage && (
                <>
                  <p>Annotator ID: {selectedImage.annotatorId}</p>
                  {selectedImage.annotatedImageBase64 && (
                    <img
                      src={selectedImage.annotatedImageBase64}
                      alt="Annotated"
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                  <p>Remarks: {selectedImage.finalRemarks}</p>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeImageDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
          <Button onClick={handleOpenDialog} style={{ backgroundColor: '#1976d2', color: 'white' }}>Add final remarks</Button>
        </div>


          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Upload Image and Add Remarks</DialogTitle>
            <DialogContent>
              <input
                type="file"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />

              <button onClick={() => fileInputRef.current.click()} style={{
                display: 'block',
                width: '100%',
                backgroundColor: 'white',
                color: '#1976d2',
                borderRadius: '4px',
                padding: '12px',
                cursor: 'pointer',
                border: '1px solid #1976d2',
                boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
                height: '60px',
              }}>Upload Annotated Image</button>

              {file && (
                <div>
                  <p>Uploaded File Name: {file.name}</p>
                  <p>File Type: {file.type}</p>
                  <p>File Size: {file.size} bytes</p>
                  <hr />
                  <div>
                    <img
                      src={base64URL}
                      alt="Uploaded"
                      style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '20px' }}
                    />
                  </div>
                </div>
              )}

              <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Final Remarks"
                    label="Final Remarks"
                    name="finalremarks"
                    multiline
                    rows={5} 
                    style={{ marginTop: '15px' }}
                    onChange={handleFinalRemarksChange}
                    sx={{
                      backgroundColor: '#fff',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      '& .MuiInputLabel-root': { color: '#000' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                        '&:hover fieldset': { borderColor: '#000' },
                        '&.Mui-focused fieldset': { borderColor: '#000' },
                      },
                      width: '100%',
                    }}
                  />
              <Button onClick={handleClickUpload} style={{ backgroundColor: '#1976d2', color: 'white' , marginTop:'10px'}}>Upload</Button>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OHIFRadiologist;

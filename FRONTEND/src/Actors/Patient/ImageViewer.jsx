import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UnitCases.css'; 
import Navbar from '../../Components/Navbar';
import { Button } from '@mui/material'; // Import Button component from Material-UI

// Static image import
import staticImage from './check.png'; // Import the static image

function ImageViewer() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://example.com/api/images');
        setImages(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Function to handle back button click
  const handleBack = () => {
    navigate('/unitCase');
  };

  return (
    <div>
      <Navbar userRole="patient" />
      <div>
        <h1>Image Viewer</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="image-container">
          {/* Displaying the image with zoom functionality */}
          <div className="zoom-container">
            <img src={staticImage} alt="Static Image" className="zoom-image" />
          </div>
        </div>
        {/* Back button styled with Material-UI */}
        <Button variant="contained" style={{ backgroundColor: '#87CEEB', marginTop: '20px' }} onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default ImageViewer;

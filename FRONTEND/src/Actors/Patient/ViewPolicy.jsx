import React, { useRef, useState } from 'react';
import { Box, Typography , Checkbox } from '@mui/material';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

export default function ViewPolicy({ isSidebarOpen, onSidebarToggle }) {
  const boxRef = useRef(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleScroll = (scrollOffset) => {
    boxRef.current.scrollTop += scrollOffset;
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar userRole="patient" isSidebarOpen={isSidebarOpen} onSidebarToggle={onSidebarToggle} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '5vh', marginLeft: '9vw', width: '80vw' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', position: 'relative', marginLeft: '2vw' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              bgcolor="#F0F7F9"
              p={2}
              borderRadius="16px"
              border="0.2vw solid #9ACEFF"
              sx={{ overflowY: 'auto', position: 'relative', scrollbarWidth: 'thin', scrollbarColor: '#9ACEFF #F0F7F9', maxWidth: '100%' }}
            >
              <Typography variant="h4" style={{ fontFamily: 'Quicksand', color: '#333', marginBottom: '2vh' }}>
               Terms and Conditions*
              </Typography> 
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                bgcolor="white" // Inner box color white
                p={2}
                borderRadius="16px"
                border="0.1vw solid #ccc" // Border color grey
                sx={{ overflowY: 'auto', maxHeight: '60vh', maxWidth: '100%' }}
                ref={boxRef} // Reference for scrolling
              >
                <Typography variant="body1" style={{ textAlign: 'left' }}>
                  {/* Text content */}
          <p>
            1. Introduction
            <br /><br />
            These terms and conditions govern your use of the healthcare application (the "App"). By accessing and using the App, you agree to be bound by these terms and conditions. If you disagree with any part of these terms and conditions, you must not use the App.
            <br /><br />
            2. Privacy
            <br /><br />
            Our Privacy Policy outlines how we collect, use, and disclose your personal information. By using the App, you consent to the collection and use of your information in accordance with our Privacy Policy.
            <br /><br />
            3. User Conduct
            <br /><br />
            You agree to use the App responsibly and lawfully. You must not use the App in any way that may cause harm to the App or impair its availability. You must not use the App to distribute any harmful content, including but not limited to viruses, malware, or unlawful material.
            <br /><br />
            4. Content
            <br /><br />
            You retain ownership of any content you submit to the App. By submitting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, reproduce, and distribute your content for the purpose of providing and improving the App's services.
            <br /><br />
            5. Medical Advice
            <br /><br />
            The information provided on the App is for informational purposes only and should not be considered medical advice. Always consult a qualified healthcare professional for medical advice and treatment.
            <br /><br />
            6. Data Security
            <br /><br />
            We take reasonable measures to protect the security of your data. However, we cannot guarantee the security of your information transmitted through the App. You acknowledge that any transmission of data is at your own risk.
            <br /><br />
            7. Legal Disclaimers
            <br /><br />
            The App is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of the App.
            <br /><br />
            8. Limitation of Liability
            <br /><br />
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the App.
            <br /><br />
            9. Amendments
            <br /><br />
            We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the App. Your continued use of the App after any such changes constitutes your acceptance of the new terms and conditions.
            <br /><br />
            10. Governing Law
            <br /><br />
            These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].
            <br /><br />
            11. Contact Us
            <br /><br />
            If you have any questions or concerns about these terms and conditions, please contact us at [Contact Information].
          </p>
          </Typography>
              </Box>
            </Box>
            
          </div>
        </div>
      </div>
    </div>
  );
}


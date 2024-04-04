import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { installViewer } from '@ohif/viewer';

export default function ViewReport() {
  const containerId = 'ohif';

  useEffect(() => {
    const ohifViewerConfig = {
      routerBasename: '/OHIF',
      filterQueryParam: true,
      servers: {
        dicomWeb: [
          {
            name: 'DCM4CHEE',
            wadoUriRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/wado',
            qidoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
            wadoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
            qidoSupportsIncludeField: true,
            imageRendering: 'wadors',
          }
        ]         
      } 
    };

    const componentRenderedOrUpdatedCallback = () => {
      console.log('OHIF Viewer rendered/updated');
    };

    installViewer(ohifViewerConfig, containerId, componentRenderedOrUpdatedCallback);

    // Cleanup function
    return () => {
      // Perform any cleanup if necessary
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <div className='container'>
      <Navbar userRole="doctor"/>
      <div>ViewReport</div>
      <div id={containerId}/>
    </div>
  );
}

// ZoomIntegration.js

import React, { useEffect, useState } from 'react';
import ZoomMtg from '@zoomus/websdk';

const ZoomIntegration = () => {
  const [participants, setParticipants] = useState([]);
  
  useEffect(() => {
    // Initialize Zoom SDK
    ZoomMtg.setZoomJSLib('https://source.zoom.us/3.5.2/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, []);

  const joinMeeting = () => {
    const meetingConfig = {
      apiKey: '',
      meetingNumber: '',
      userName: '',
      passWord: '', 
    };

    ZoomMtg.init({
      leaveUrl: '/',
      isSupportAV: true,
      success: function () {
        ZoomMtg.join({
          ...meetingConfig,
          success: (success) => {
            console.log('Meeting joined successfully:', success);
          },
          error: (error) => {
            console.error('Failed to join meeting:', error);
          },
        });
      },
      error: function (error) {
        console.error('Failed to initialize Zoom SDK:', error);
      },
    });
  };

  const fetchParticipants = () => {
    const dummyParticipants = ['Participant 1', 'Participant 2', 'Participant 3'];
    setParticipants(dummyParticipants);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Zoom Integration</h1>
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={joinMeeting}
        >
          Join Meeting
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={fetchParticipants}>
          Fetch Participants
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Participants</h2>
        <ul>
          {participants.map((participant, index) => (
            <li key={index} className="py-1">{participant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ZoomIntegration;

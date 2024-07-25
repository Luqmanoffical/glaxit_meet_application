import React, { useState, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import { getParticipants, postHistory } from '../components/Service/api';
import './Meeting.css';

const Meeting = ({ roomName, displayName, endMeeting }) => {
  const navigate = useNavigate();
  const [meetingActive, setMeetingActive] = useState(() => {
    const storedMeetingActive = localStorage.getItem('meetingActive');
    return storedMeetingActive ? JSON.parse(storedMeetingActive) : true;
  });
  const [toolbarButtons, setToolbarButtons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantData = await getParticipants();
        if (participantData) {
          const participant = participantData.find(
            (p) => p.username === displayName && p.room === roomName
          );
          if (participant) {
            const permissions = participant.permissions || {};
            const buttons = [
              permissions.MuteMic === false ? 'microphone' : null,
              permissions.CameraOpen === true ? 'camera' : null,
              permissions.ShareScreen === true ? 'desktop' : null,
              'closedcaptions',
              'fullscreen',
              'profile',
              'info',
              permissions.VideoRecording === true ? 'recording' : null,
              'sharedvideo',
              'raisehand',
              'videoquality',
              'tileview',
              'videobackgroundblur',
              'hangup',
            ];

            setToolbarButtons(buttons);
          } else {
            console.log('Participant not found');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const saveHistory = async () => {
      try {
        const response = await postHistory({
          roomName: roomName,
          username: displayName,
        });
      } catch (error) {
        console.error('Error saving meeting history:', error);
      }
    };

    saveHistory();
  }, [displayName, roomName]);

  const handleApiReady = (api) => {
    console.log('Jitsi Meet API is ready!', api);

    api.addEventListener('participantJoined', (participant) => {
      console.log('Participant joined:', participant);
    });

    api.addEventListener('participantLeft', (participant) => {
      console.log('Participant left:', participant);
    });

    api.addEventListener('toolbarButtonClicked', (button) => {
      if (button === 'hangup') {
        setMeetingActive(false);
        localStorage.setItem('meetingActive', JSON.stringify(false));
        endMeeting(); 
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('meetingActive', JSON.stringify(meetingActive));
  }, [meetingActive]);

  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      {meetingActive ? (
        <JitsiMeeting
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            notifications: [],
            enableLipSync: true,
            websocketKeepAlive: true,
            websocketKeepAliveUrl: 'https://your-server/keepalive',
            prejoinPageEnabled: false,
            disableInviteFunctions: true,
            enableWelcomePage: false,
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,
            HIDE_DEEP_LINKING_LOGO: true,
            SHOW_BRAND_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            disableWelcomePage: false,
            CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
            TOOLBAR_BUTTONS: toolbarButtons,
          }}
          roomName={roomName}
          displayName={displayName}
          onAPILoad={handleApiReady}
          loadingComponent={<p>Loading...</p>}
          getIFrameRef={(node) => {
            const handleIframeLoad = () => {
              try {
                if (node && node.contentWindow) {
                  const iframeDocument =
                    node.contentDocument || node.contentWindow.document;
                  if (iframeDocument) {
                    const styleElement = iframeDocument.createElement('style');
                    styleElement.textContent = `
                      .leftwatermark {
                        display: none !important;
                      }
                    `;
                    iframeDocument.head.appendChild(styleElement);
                  } else {
                    console.error('Failed to access iframe document');
                  }
                } else {
                  console.error('Failed to access iframe contentWindow');
                }
              } catch (error) {
                console.error('Error accessing iframe document:', error);
              }
            };

            if (node) {
              if (node.contentWindow && node.contentWindow.document) {
                handleIframeLoad();
              } else {
                node.addEventListener('load', handleIframeLoad);
              }
              node.style.height = '100vh';
            }
          }}
        />
      ) : (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Meeting;

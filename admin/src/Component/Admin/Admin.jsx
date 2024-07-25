import React, { useState } from 'react';
import { addParticipant } from '../../Service/api';

function Admin() {
  const [forms, setForms] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showPermissionBox, setShowPermissionBox] = useState({});

  const clickHandle = () => {
    const newForm = { id: forms.length + 1, username: '', email: '', password: '', room: '' };
    setForms([...forms, newForm]);
    setPermissions([...permissions, { id: forms.length + 1, MuteMic: false, ShareScreen: false, CameraOpen: false, VideoRecording: false }]);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setForms(forms.map(form => form.id === id ? { ...form, [name]: value } : form));
  };

  const handlePermissionToggle = (id) => {
    setShowPermissionBox(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handlePermissionChange = (e, id) => {
    const { name, checked } = e.target;
    setPermissions(permissions.map(permission => permission.id === id ? { ...permission, [name]: checked } : permission));
  };

  const handlePermissionSave = async (id) => {
    try {
      const participant = forms.find(form => form.id === id);
      participant.permissions = permissions.find(permission => permission.id === id);
      await addParticipant(participant);
      console.log('Participant added:', participant);
      setShowPermissionBox(prevState => ({ ...prevState, [id]: false }));
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  return (
    <div className="p-7">
      <div className="border">
        <div className="flex justify-between border">
          <h2 className="m-7 font-bold">Add Participants</h2>
          <button className="m-7 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" onClick={clickHandle}>
            + Add
          </button>
        </div>
        <div className="m-5">
          {forms.map((form) => (
            <div key={form.id} className="mb-4 border p-4">
              <h3 className="font-bold mb-2">Participant {form.id}:</h3>
              <div className="mb-2 flex items-center">
                <div>
                  <label>Username:</label>
                  <input type="text" placeholder='Participant Name' name="username" value={form.username} onChange={(e) => handleChange(e, form.id)} className="ml-2 p-1 border" />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="text" placeholder='Email Address' name="email" value={form.email} onChange={(e) => handleChange(e, form.id)} className="ml-2 p-1 border" />
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" placeholder='Password' name="password" value={form.password} onChange={(e) => handleChange(e, form.id)} className="ml-2 p-1 border" />
                </div>
                <div>
                  <label>Room Name:</label>
                  <input type="text" placeholder='Enter unique Room name' name="room" value={form.room} onChange={(e) => handleChange(e, form.id)} className="ml-2 p-1 border" />
                </div>
                <div>
                  <button onClick={() => handlePermissionToggle(form.id)} className="m-7 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Permission
                  </button>
                </div>
              </div>
              {showPermissionBox[form.id] && (
                <div className="border p-4 mt-2">
                  <h4 className="font-bold mb-2">Set Permissions for Participant {form.id}:</h4>
                  <div className="flex flex-col">
                    <label className="mb-2">
                      <input type="checkbox" name="MuteMic" checked={permissions.find(permission => permission.id === form.id)?.MuteMic || false} onChange={(e) => handlePermissionChange(e, form.id)} /> Mute Mic
                    </label>
                    <label className="mb-2">
                      <input type="checkbox" name="ShareScreen" checked={permissions.find(permission => permission.id === form.id)?.ShareScreen || false} onChange={(e) => handlePermissionChange(e, form.id)} /> Share Screen
                    </label>
                    <label className="mb-2">
                      <input type="checkbox" name="CameraOpen" checked={permissions.find(permission => permission.id === form.id)?.CameraOpen || false} onChange={(e) => handlePermissionChange(e, form.id)} /> Camera Open
                    </label>
                    <label className="mb-2">
                      <input type="checkbox" name="VideoRecording" checked={permissions.find(permission => permission.id === form.id)?.VideoRecording || false} onChange={(e) => handlePermissionChange(e, form.id)} /> Video Recording
                    </label>
                  </div>
                  <button onClick={() => handlePermissionSave(form.id)} className="m-7 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;

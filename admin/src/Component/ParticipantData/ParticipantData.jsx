import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import '../../../node_modules/datatables.net';
import '../../../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css';
import { getParticipants, updateParticipant, deleteParticipant } from '../../Service/api';

function ParticipantData() {
  const [data, setData] = useState([]);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const participants = await getParticipants();
      setData(participants);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if ($.fn.dataTable.isDataTable('#example')) {
       $('#example').DataTable().clear().rows.add(data).draw();
    }else {
      $('#example').DataTable({
        data,
        columns: [
          { title: 'User id', data: '_id', visible: false },          
          { title: 'No', data: '' , render: function (data, type, row, meta) { return meta.row + 1; } },
          { title: 'User Name', data: 'username' },
          { title: 'Email', data: 'email' },
          { title: 'Room Name', data: 'room' },
          {
            title: 'Edit',
            data: null,
            render: (data, type, row) => {
              return `<button class="edit-btn text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" data-id="${row._id}" >Edit</button>`;
            }
          },
          {
            title: 'Delete',
            data: null,
            render: (data, type, row) => {
              return `<button class="delete-btn text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" data-id="${row._id}">Delete</button>`;
            }
          }
      
        ]
      });
    }


    return () => {
      if (!$.fn.dataTable.isDataTable('#example')) {
        $('#example').DataTable().destroy(true);
      }
    };
  }, [data]);

  useEffect(() => {
    $('#example tbody').on('click', '.edit-btn', function () {
      const id = $(this).data('id');
      console.log('Edit button clicked for ID:', id);
      const participant = data.find(p => p._id === id);
      if (participant) {
        setEditingParticipant(participant);
        setPermissions(participant.permissions || {});
        setModalVisible(true);
      } else {
        console.error(`Participant with id ${id} not found.`);
      }
    });
    $('#example tbody').on('click', '.delete-btn', function () {
      const id = $(this).data('id');
      console.log('Delete button clicked for ID:', id);
      const participant = data.find(p => p._id === id);
      if (participant) {
        setParticipantToDelete(participant);
        setDeleteModalVisible(true);
      } else {
        console.error(`Participant with id ${id} not found.`);
      }
    });

  }, [data]);
  
  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions({ ...permissions, [name]: checked });
  };

  const handleSave = async () => {
    try {
      const updatedParticipant = {
        ...editingParticipant,
        permissions,
      };
      await updateParticipant(updatedParticipant);
      setData(data.map((p) => ( p._id === updatedParticipant._id ? updatedParticipant : p)));
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteParticipant(participantToDelete._id);
      setData(data.filter((p) => p._id !== participantToDelete._id));
      setDeleteModalVisible(false);
      setParticipantToDelete(null);
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  return (
    <div>
      <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-full">
        <h2>Participant Data</h2>
      </button>
      <table id="example" className="display">
        <thead>
          <tr>
            <th>User id</th>
            <th>No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Room Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
      </table>
      {modalVisible &&   editingParticipant &&(
   <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
   <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
     <h2 className="text-lg font-semibold mb-4">Edit Participant</h2>
     <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Id:</label>
              <input
                type="text"
                value={editingParticipant._id}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                readOnly
              />
            </div>
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
       <input
         type="text"
         value={editingParticipant.username}
         onChange={e => setEditingParticipant({ ...editingParticipant, username: e.target.value })}
         className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
       />
     </div>
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
       <input
         type="email"
         value={editingParticipant.email}
         onChange={e => setEditingParticipant({ ...editingParticipant, email: e.target.value })}
         className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
       />
     </div>
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-1">Room Name:</label>
       <input
         type="text"
         value={editingParticipant.room}
         onChange={e => setEditingParticipant({ ...editingParticipant, room: e.target.value })}
         className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
       />
     </div>
     
     <div className="flex flex-col">
              <label className="mb-2">
                <input
                  type="checkbox"
                  name="MuteMic"
                  checked={permissions.MuteMic || false}
                  onChange={handlePermissionChange}
                />{' '}
                Mute Mic
              </label>
              <label className="mb-2">
                <input
                  type="checkbox"
                  name="ShareScreen"
                  checked={permissions.ShareScreen || false}
                  onChange={handlePermissionChange}
                />{' '}
                Share Screen
              </label>
              <label className="mb-2">
                <input
                  type="checkbox"
                  name="CameraOpen"
                  checked={permissions.CameraOpen || false}
                  onChange={handlePermissionChange}
                />{' '}
                Camera Open
              </label>
              <label className="mb-2">
                <input
                  type="checkbox"
                  name="VideoRecording"
                  checked={permissions.VideoRecording || false}
                  onChange={handlePermissionChange}
                />{' '}
                Video Recording
              </label>
            </div>
      
 
 
     <div className="flex justify-end gap-2">
       <button onClick={handleSave} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 py-2.5">
         Save
       </button>
       <button onClick={() => setModalVisible(false)} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5">
         Cancel
       </button>
     </div>
   </div>
 </div>
      )}
    {deleteModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this participant?</h2>
            <div className="mb-4">
              <p><strong>Name:</strong> {participantToDelete?.username}</p>
              <p><strong>Email:</strong> {participantToDelete?.email}</p>
              <p><strong>Room Name:</strong> {participantToDelete?.room}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5">
                Delete
              </button>
              <button onClick={() => setDeleteModalVisible(false)} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  

    </div>
  );
}

export default ParticipantData;
 
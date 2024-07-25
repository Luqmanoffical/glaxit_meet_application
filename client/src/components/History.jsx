import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import '../../node_modules/datatables.net';
import '../../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css';
import { getHistory } from '../components/Service/api';

function History() {
  const [meetingHistory, setMeetingHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistory();
        setMeetingHistory(history);
      } catch (error) {
        console.error('Error fetching meeting history:', error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (meetingHistory.length > 0) {
      const table = $('#example').DataTable({
        data: meetingHistory,
        columns: [
          { title: 'Meeting ID', data: 'meetingId' },
          { title: 'Room Name', data: 'roomName' },
          { title: 'Participant Name', data: 'username' },
          { title: 'Time', data: 'dateAndTime' },
        ],
        destroy: true,
      });

      return () => {
        table.destroy();
      };
    }
  }, [meetingHistory]);

  useEffect(() => {
    $('#example').DataTable();
  }, [meetingHistory]);

  return (
    <div>
      <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-full">
        <h2>History</h2>
      </button>
      <table id="example" className="display">
        <thead>
          <tr>
            <th>Meeting ID</th>
            <th>Room Name</th>
            <th>Participant Name</th>
            <th>Time</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default History;

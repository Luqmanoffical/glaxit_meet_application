import React from "react";
import home from "../../assets/i.jpg";
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();

  const handleStartMeetingClick = () => {
    navigate('/StartMeeting'); 
  };

  const handleCalendarClick = () => {
    navigate('/MyCalendar');
  };

  return (
    <div className="MeetPage">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${home})`,
          width: "98.7vw",
          height: "100vh",
        }}
      >
        <div
          className="flex h-full items-center justify-between px-12 mx-12"
          style={{ width: "70vw" }}
        >
          <div className="text-left ">
            <h1
              className="text-4xl font-bold text-white"
              style={{ width: "70vw" }}
            >
              Welcome to Meet
            </h1>
            <p className="text-lg text-white mt-4 w-1/2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
              rerum reprehenderit quod deserunt eveniet sequi amet repudiandae
              hic, illum harum fuga sint nisi iste voluptates odit magnam! Est,
              tenetur amet.
            </p>
            <button
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-full"
              style={{ width: "120px" }}
              onClick={handleStartMeetingClick}
            >
              Meet Now
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <div className=" bg-white p-8 flex flex-col items-center justify-center">
        <div
          className='"w-1/5  flex flex-col items-center justify-center bg-blue-100 border-2 border-blue-900 rounded p-6'
          style={{ width: "50vw" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
            <path
              fillRule="evenodd"
              d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Connect your calendar to veiw all your meeting here. </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCalendarClick}
          >
            Connect Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

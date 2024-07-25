import React from "react";
import { generateAvatar } from '../components/generateAvatar'
const ProfileModal = ({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  const profileImage = userData?.username ? generateAvatar(userData.username) : 'path_to_default_image';

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full h-20 w-20 mx-auto"
        />
        <div className="text-center mt-4">
          <h2 className="text-lg text-gray-600 font-semibold">{userData.username}</h2>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">id:{userData._id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

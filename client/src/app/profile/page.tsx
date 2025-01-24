'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Profile() {
  const [friendEmail, setFriendEmail] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);


  if (!isAuthenticated) {
    return <p className="text-center text-xl mt-10 font-semibold text-gray-600">Please log in to view your profile.</p>;
  }
  
  if (!user) {
    console.error('User is not defined!');
    return; // Exit the function or handle the error
  }

  const handleSendInvite = async () => {
    if (!friendEmail) return alert('Please enter a valid email address.');

    setLoading(true);

    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_INVITE!;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        to_email: friendEmail,
        message: 'Join me on this amazing drawing platform!',
        from_name: user.given_name,
        to_name: friendEmail,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      alert(`Invite sent to ${friendEmail}!`);
      setFriends((prev) => [...prev, friendEmail]);
      setFriendEmail('');
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Failed to send invite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewRoom = () => {
      const newRoom = prompt('Enter the name of the room:');
      if (newRoom && newRoom.trim()) {
        toast.success(`Joining new room: ${newRoom}`, { position: 'top-right' });
        router.push(`/canvas/${newRoom.trim()}`);
      } else {
        toast.error('Invalid room name. Please try again.');
      }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        User Profile
      </h1>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-start space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-1/3 flex justify-center lg:justify-end -mt-10">
          <img
            src={user.picture || "/default-avatar.jpg"}
            alt="Profile"
            className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
        </div>
        <div className="lg:w-2/3 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Name: {user.given_name} {user.family_name}
          </h2>
          <p className="text-lg text-gray-600">Email: {user.email}</p>
        </div>
      </div>

      {/* Recent Activities
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg text-gray-700">Drawing Activities</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Started a new drawing project</li>
            <li>Completed 3 new drawings</li>
            <li>Shared a drawing on social media</li>
          </ul>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center space-x-4 mt-6">
        
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Home Page
        </button>

        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <LogoutLink>Log Out</LogoutLink>
        </button>

        <button
          onClick={handleNewRoom}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Join Room
        </button>

        <button
        onClick={() => setShowModal(true)}
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        Start Conversation
      </button>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ready to Chat?</h2>
            <p className="text-gray-600 mb-6">
              Want to chat with your friends? Head to the room and start your conversation, with Canvas making it 
              effortless and fun for you!
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleNewRoom}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Head to Room
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* Invite Friends */}
      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-700">Invite a Friend</h3>
        <div className="flex mt-4">
          <input
            type="email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            placeholder="Enter friend's email"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={handleSendInvite}
            className="bg-blue-600 text-white py-3 px-6 rounded-r-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>

      {/* Friends Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Friends</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {friends.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No friends added yet. Send an invite!</p>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRedoAlt, FaHome, FaDoorOpen } from 'react-icons/fa';

export default function RoomExitPage() {
  const [timer, setTimer] = useState<number>(30);
  const [room, setRoom] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam) {
      setRoom(roomParam);
    } else {
      console.warn('No room parameter found.');
    }
  }, [searchParams]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleRejoin = () => {
    if (room) {
      toast.success(`Rejoining room: ${room}`, { position: 'top-right' });
      router.push(`/canvas/${room}`);
    } else {
      toast.error('Room is undefined. Cannot rejoin.');
    }
  };

  const handleNewRoom = () => {
    const newRoom = prompt('Enter the name of the new room:');
    if (newRoom && newRoom.trim()) {
      toast.success(`Joining new room: ${newRoom}`, { position: 'top-right' });
      router.push(`/canvas/${newRoom.trim()}`);
    } else {
      toast.error('Invalid room name. Please try again.');
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white p-6 relative bg-cover bg-center"
      style={{
        backgroundImage: 'url(/bg.jpg)', // Replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* Main Content */}
      <div className="z-10 space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
          You&apos;ve Left the Room
        </h1>
        <p className="text-lg font-medium">
          You can rejoin the room within{' '}
          <span className="font-bold text-yellow-400">{timer}s</span> or choose
          another action.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Rejoin Room Button */}
          <button
            onClick={handleRejoin}
            disabled={timer === 0}
            className={`flex items-center justify-center px-6 py-3 rounded-lg shadow-xl text-lg font-semibold transition-transform transform duration-200 ${
              timer > 0
                ? 'bg-green-500 hover:bg-green-600 hover:scale-105'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            <FaRedoAlt className="mr-2" />
            Rejoin Room
          </button>

          {/* Join New Room Button */}
          <button
            onClick={handleNewRoom}
            className="flex items-center justify-center px-6 py-3 rounded-lg shadow-xl text-lg font-semibold bg-blue-500 hover:bg-blue-600 transform transition-transform duration-200 hover:scale-105"
          >
            <FaDoorOpen className="mr-2" />
            Join New Room
          </button>

          {/* Go Home Button */}
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center px-6 py-3 rounded-lg shadow-xl text-lg font-semibold bg-red-500 hover:bg-red-600 transform transition-transform duration-200 hover:scale-105"
          >
            <FaHome className="mr-2" />
            Go to Home
          </button>
          
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

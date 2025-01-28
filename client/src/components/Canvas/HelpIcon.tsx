"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaQuestionCircle } from 'react-icons/fa';

const SidebarIcons = () => {
  const [showHelp, setShowHelp] = useState(false);

  const queriesAndSteps = [
    {
      query: 'How do I upload a file?',
      answer: 'Click on "Open File" in the sidebar and select a PDF or image to upload.',
    },
    {
      query: 'How can I save my drawing?',
      answer: 'Use the "Save" button in the sidebar to save to Google Drive or generate a shareable link.',
    },
    {
      query: 'How do I reset the canvas?',
      answer: 'Click on "Reset Canvas" in the sidebar to start fresh.',
    },
    {
      query: 'How do I export my drawing?',
      answer: 'Click "Export" to save your drawing as an image or PDF to your device.',
    },
    {
      query: 'Adjust shape properties?',
      answer: 'Use the "Shape Properties" sliders in the sidebar to change line width and opacity.',
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 flex gap-3">
      {/* Home Icon */}
      <Link href="/">
        <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200">
          <FaHome className="text-white text-xl" />
        </div>
      </Link>

      {/* Help Icon */}
      <div
        className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-600 transition duration-200"
        onClick={() => setShowHelp(!showHelp)}
      >
        <FaQuestionCircle className="text-white text-xl" />
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute bottom-20 right-0 bg-white shadow-xl rounded-lg w-80 p-4 animate-slide-up z-50">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Help & FAQs</h2>
          <ul className="text-gray-600 space-y-3 max-h-60 overflow-y-auto">
            {queriesAndSteps.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-medium text-gray-700">{item.query}</p>
                <p className="text-sm">{item.answer}</p>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => setShowHelp(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarIcons;

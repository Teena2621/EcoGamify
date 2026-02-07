import React from 'react';
import GameCard from './GameCard'; 


const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const Button = ({ children, className, href }) => (
  <a href={href} className={`inline-flex items-center justify-center px-8 py-3 rounded-xl text-lg font-semibold transition-colors duration-200 border-2 border-gray-300 text-gray-800 hover:bg-gray-50 shadow-md ${className || ''}`}>
    {children}
  </a>
);



// --- VIDEO LECTURE DATA (Updated Links) ---
const videoData = [
  {
    id: 'photo-synth',
    title: 'Introduction to Photosynthesis',
    image: '', 
    xpAward: 50,
    progress: 100, 
    statusText: '12:45', 
    link: '/dashboard/vedio-lectures/photo-synth',  
    placeholderText: 'TOPIC 1'
  },
  {
    id: 'fungi-world',
    title: 'The Amazing World of Fungi',
    image: '', 
    xpAward: 75,
    progress: 40, 
    statusText: '15:20',
    link: '/dashboard/vedio-lectures/fungi-world',  
    placeholderText: 'TOPIC 2'
  },
  {
    id: 'ecosystems',
    title: 'Ecosystems and Biomes',
    image: '', 
    xpAward: 100,
    progress: 0, 
    statusText: '21:10',
    link: '/dashboard/vedio-lectures/ecosystems', 
    placeholderText: 'TOPIC 3'
  },
];


export default function VideoCardGrid() {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4 mb-8">
        <a href="/dashboard" className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
          <ArrowLeftIcon />
        </a>
        <h1 className="text-3xl font-bold text-gray-900">
          Video Lectures
        </h1>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videoData.map((video) => (
          <GameCard key={video.id} game={video} type="video" /> 
        ))}
      </div>

      {/* Back Button at the bottom */}
      <div className="flex justify-center pt-8">
        <Button href="/dashboard" className="shadow-lg">
          <ArrowLeftIcon />
          Back
        </Button>
      </div>
    </div>
  );
}
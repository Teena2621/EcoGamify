 import React from 'react';


export default function VideoPlayer({ videoId, title }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" 
           style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        
        {/* Iframe for embedding the video */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Video Notes</h3>
        <p className="text-gray-600">
          This is where detailed notes, transcripts, or supporting materials for the video lecture would go. 
        </p>
      </div>
    </div>
  );
}
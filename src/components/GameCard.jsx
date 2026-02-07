 import React from 'react';

// --- Placeholder Components to avoid Next.js import errors (e.g., next/link, next/image) ---

// Custom Button component using native <a> tag for navigation
const Button = ({ children, className, onClick, variant = 'default', href }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-center inline-block cursor-pointer";
  const defaultClasses = "bg-teal-500 hover:bg-teal-600 text-white shadow-md";
  const outlineClasses = "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm";
  
  const finalClasses = `${baseClasses} ${variant === 'outline' ? outlineClasses : defaultClasses} ${className || ''}`;

  if (href) {
    return (
      <a href={href} className={finalClasses}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={finalClasses}>
      {children}
    </button>
  );
};

// Simple Progress Bar
const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-teal-500 h-2 rounded-full transition-all duration-500" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
);
// --- End of Placeholder Components ---


export default function GameCard({ game }) {
  const { id, title, image, xpAward, progress, statusText, link, placeholderText } = game;

  const hasImage = image && image.length > 0;
  
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      
      {/* Game Image/Placeholder Area */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        {hasImage ? (
          // RENDER IMAGE (if provided)
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // RENDER CUSTOM PLACEHOLDER (if no image)
          <div className="flex flex-col items-center justify-center w-full h-full bg-teal-50 text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 mb-2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <p className="text-2xl font-extrabold tracking-wider">{placeholderText || 'GAME'}</p>
          </div>
        )}
        
        {/* XP Badge (Top Left) - Always renders */}
        <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
          +{xpAward} XP
        </span>
        
        {/* Status Text (Top Right) - Always renders */}
        {statusText && (
          <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
            {statusText}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
          {title}
        </h3>

        {/* Progress Bar & Status */}
        {typeof progress === 'number' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span className="font-medium text-teal-600">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-3 mt-4">
            <Button href={link} className="flex-1">
                Game
            </Button>
            <Button variant="outline" href="#" className="flex-1">
                Details
            </Button>
        </div>
      </div>
    </div>
  );
}
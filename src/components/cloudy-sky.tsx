// A simplified cloud component using divs
const Cloud = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`absolute bg-white rounded-full ${className}`} style={style}></div>
);

export default function CloudySky() {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      {/* Distant, blurred clouds */}
      <Cloud className="w-96 h-24 opacity-50 blur-md animate-drift" style={{ top: '10%', animationDuration: '90s' }} />
      <Cloud className="w-80 h-20 opacity-40 blur-lg animate-drift" style={{ top: '20%', right: '-10rem', animationDuration: '120s', animationDelay: '-20s' }} />
      
      {/* Mid-ground clouds */}
      <Cloud className="w-72 h-20 opacity-70 blur-sm animate-drift" style={{ top: '30%', left: '-8rem', animationDuration: '70s' }} />
      <Cloud className="w-96 h-28 opacity-60 blur-sm animate-drift" style={{ top: '40%', right: '-12rem', animationDuration: '80s', animationDelay: '-10s' }} />

      {/* Foreground clouds */}
      <Cloud className="w-64 h-16 opacity-80 animate-drift" style={{ bottom: '25%', left: '5%', animationDuration: '50s' }} />
      <Cloud className="w-80 h-20 opacity-75 animate-drift" style={{ bottom: '15%', right: '2%', animationDuration: '60s', animationDelay: '-15s' }} />
    </div>
  );
}

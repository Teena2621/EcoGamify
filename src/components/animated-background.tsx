import CloudySky from "./cloudy-sky";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-sky-200 via-sky-100 to-blue-200 animate-gradient-animation" style={{backgroundSize: '200% 200%'}}>
      <CloudySky />
    </div>
  )
}

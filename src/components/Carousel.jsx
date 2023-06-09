import videito from '../assets/video/video-completo.mp4'
export default function Carousel() {
  return (
    <video className="h-full w-full rounded-lg" controls autoPlay muted loop>
      <source src={videito} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
import { PlaceHolderImages } from '@/lib/placeholder-images'
import KenBurnsImage from './ken-burns-image'

const pictureData = [
  { id: 'picture-1' },
  { id: 'picture-2' },
  { id: 'picture-3' },
  { id: 'picture-4' },
]

export default function EnvironmentalPictures() {
  const pictures = pictureData.map(item => {
    const imageData = PlaceHolderImages.find(p => p.id === item.id)
    return { ...item, ...imageData }
  })

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 text-center">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {pictures.map((pic) => (
          pic.imageUrl && pic.description && pic.imageHint && (
            <KenBurnsImage
              key={pic.id}
              imageUrl={pic.imageUrl}
              alt={pic.description}
              imageHint={pic.imageHint}
            />
          )
        ))}
      </div>
    </section>
  )
}

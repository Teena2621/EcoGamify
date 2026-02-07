import Link from 'next/link'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Card, CardContent } from '@/components/ui/card'

const gameData = [
  { id: 'game-1', name: 'Recycle Rush' },
  { id: 'game-2', name: 'Forest Guardian' },
  { id: 'game-3', name: 'Ocean Cleanup' },
  { id: 'game-4', name: 'Carbon Crushers' },
  { id: 'game-5', name: 'Eco-Builder' },
]

export default function GameSection() {
    const games = gameData.map(item => {
    const imageData = PlaceHolderImages.find(p => p.id === item.id)
    return { ...item, ...imageData }
  })

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 text-center">Test Your Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {games.map((game) => (
          <Link href="/login" key={game.id} className="group block">
            <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:shadow-primary/20">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  {game.imageUrl && (
                    <Image
                      src={game.imageUrl}
                      alt={game.description || game.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={game.imageHint}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                     <h3 className="text-sm font-bold text-white text-center truncate">{game.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

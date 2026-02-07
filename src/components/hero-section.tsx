import RisingParticles from "./rising-particles";
import TypingAnimation from "./typing-animation";
import Silhouettes from "./silhouettes";

export default function HeroSection() {
    return (
        <section className="relative flex items-center justify-center min-h-[40vh] py-16 md:py-24 p-4 md:p-8 overflow-hidden">
            <RisingParticles />
            <Silhouettes />
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full z-20">
                <TypingAnimation />
                <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                    Your adventure starts here. Discover, play, and connect with gamers from around the world.
                </p>
            </div>
        </section>
    )
}

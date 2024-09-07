import { Link } from "lucide-react";
import "./Projects.css";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function Projects() {
    return (
        <section id="projects">
            <div class="container mx-auto px-8 py-8 h-max">
                <h1 class="text-3xl font-bold mb-4 ">Projects</h1>
                <div class="flex justify-center gap-4 max-h-[300px] flex-wrap sm:gap-8">
                    <NeonGradientCard className="max-w-md max-h-sm flex items-center justify-center text-center sm:w-max transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <a
                            href="https://prime-estate-rho.vercel.app"
                            className="z-12"
                        >
                            <span class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                                <img
                                    src="./prime-estate.png"
                                    className="rounded-xl h-48 w-full"
                                />
                            </span>
                            <p class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mt-2">
                                PrimeEstate 🔗
                            </p>
                        </a>
                    </NeonGradientCard>

                    <NeonGradientCard className="w-max max-h-sm flex items-center justify-center text-center sm:w-max transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <a
                            href="https://github.com/YasinzHyper/ariel_ai"
                            className="z-12"
                        >
                            <span class="pointer-events-none z-11 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                                <img
                                    src="./ariel-ai.jpg"
                                    className="rounded-xl object-contain h-48 w-full"
                                />
                            </span>
                            <p class="pointer-events-none z-11 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mt-2">
                                ArielAI🔗 
                            </p>{" "}
                        </a>
                    </NeonGradientCard>

                    <NeonGradientCard className="w-max max-h-sm flex items-center justify-center text-center  sm:w-max transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <a
                            href="https://github.com/YasinzHyper/IntelliCam"
                            className="z-12"
                        >
                            <span class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                                <img
                                    src="./intellicam.jpeg"
                                    className="rounded-xl object-contain h-48 w-full"
                                />
                            </span>
                            <p class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mt-2">
                                IntelliCam🔗
                            </p>
                        </a>
                    </NeonGradientCard>

                    <NeonGradientCard className="w-max max-h-sm flex items-center justify-center text-center sm:w-max transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <a
                            href="https://github.com/YasinzHyper/ShopQwik"
                            className="z-12"
                        >
                            <span class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                                <img
                                    src="./shopqwik.jpeg"
                                    className="rounded-xl object-contain h-48 w-full"
                                />
                            </span>
                            <p class="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mt-2">
                                ShopQwik🔗
                            </p>
                        </a>
                    </NeonGradientCard>
                </div>
            </div>
        </section>
    );
}

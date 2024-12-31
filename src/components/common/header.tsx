import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Github, Menu, X } from "lucide-react";

interface HeaderProps {
    onAboutClick: () => void;
    onSkillsClick: () => void;
    onProjectsClick: () => void;
    onCareerClick: () => void;
}

export default function Header({
    onAboutClick,
    onSkillsClick,
    onProjectsClick,
    onCareerClick,
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-800 py-4 px-6 z-10">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Hamburger button for small screens */}
                <button
                    className="md:hidden text-white hover:text-gray-300"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation menu */}
                <nav
                    className={`${isMenuOpen ? "block" : "hidden"
                        } md:flex md:space-x-4 absolute md:relative top-14 md:top-auto left-0 right-0 bg-gray-800 md:bg-transparent flex-col md:flex-row items-center`}
                >
                    <Button
                        variant="ghost"
                        onClick={onAboutClick}
                        className="w-full md:w-auto text-left md:text-center"
                    >
                        About
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onSkillsClick}
                        className="w-full md:w-auto text-left md:text-center"
                    >
                        Skills
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onProjectsClick}
                        className="w-full md:w-auto text-left md:text-center"
                    >
                        Projects
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onCareerClick}
                        className="w-full md:w-auto text-left md:text-center"
                    >
                        Career
                    </Button>
                    {isMenuOpen && (
                        <div className="mt-4 flex justify-center items-baseline pb-2 space-x-4 md:hidden">
                            <a
                                href="https://facebook.com/bunay.gwapo.guda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="https://github.com/egboyguda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Github size={24} />
                            </a>
                        </div>
                    )}
                </nav>


                {/* Social media links */}
                <div className="hidden md:flex space-x-4">
                    <a
                        href="https://facebook.com/bunay.gwapo.guda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <Facebook size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/eg-boy-guda-a3830313a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="https://github.com/egboyguda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <Github size={24} />
                    </a>
                </div>
            </div>

            {/* Social links visible in mobile menu */}



        </header>
    );
}

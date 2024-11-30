import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Github } from 'lucide-react'

interface HeaderProps {
    onAboutClick: () => void
    onSkillsClick: () => void
    onProjectsClick: () => void
    onCareerClick: () => void
}

export default function Header({
    onAboutClick,
    onSkillsClick,
    onProjectsClick,
    onCareerClick,
}: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-800 py-4 px-6 z-10">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <nav className="flex space-x-4">
                    <Button variant="ghost" onClick={onAboutClick}>About</Button>
                    <Button variant="ghost" onClick={onSkillsClick}>Skills</Button>
                    <Button variant="ghost" onClick={onProjectsClick}>Projects</Button>
                    <Button variant="ghost" onClick={onCareerClick}>Career</Button>
                </nav>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <Facebook size={24} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <Github size={24} />
                    </a>
                </div>
            </div>
        </header>
    )
}


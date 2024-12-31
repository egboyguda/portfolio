'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ExternalLink, Code, Image as ImageIcon, LayoutGrid, Server, Database, Cloud } from 'lucide-react'

const projects = [
    {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
        image: '/placeholder.svg?height=200&width=300',
        techStack: ['react', 'nodejs', 'mongodb']
    },
    {
        title: 'Task Management App',
        description: 'A responsive task management application built with Next.js and PostgreSQL.',
        image: '/placeholder.svg?height=200&width=300',
        techStack: ['nextjs', 'postgresql']
    },
    {
        title: 'Weather Dashboard',
        description: 'A real-time weather dashboard using React, Redux, and a weather API.',
        image: '/placeholder.svg?height=200&width=300',
        techStack: ['react', 'redux', 'api']
    }
]

const techStackIcons = {
    react: LayoutGrid,
    nodejs: Server,
    mongodb: Database,
    nextjs: Cloud,
    postgresql: Database,
    redux: Cloud,
    api: Cloud
}

const Projects = forwardRef<HTMLElement>((props, ref) => {
    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6"
        >
            <div className="max-w-6xl w-full">
                <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex mb-4">
                                    {project.techStack.map((tech) => {
                                        const IconComponent = techStackIcons[tech as keyof typeof techStackIcons]
                                        return (
                                            <div key={tech} className="mr-2 text-gray-400" title={tech}>
                                                <IconComponent size={20} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button size="sm" className="flex items-center">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Demo
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white"
                                    >
                                        <Code className="mr-2 h-4 w-4" />
                                        View Source
                                    </Button>
                                    <Button size="sm" variant="secondary" className="flex items-center">
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Gallery
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
})

Projects.displayName = 'Projects'

export default Projects


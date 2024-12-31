'use client';

import { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Image as ImageIcon } from 'lucide-react';
import { ImageModal } from '../image/modal';

interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    demoUrl: string | null;
    sourceUrl: string | null;
    createdAt: string;
    updatedAt: string;
    images: {
        id: string;
        url: string;
        projectId: string;
        public_id: string;
    }[];
}

const Projects = forwardRef<HTMLElement>((props, ref) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedImage, setSelectedImage] = useState<Project['images'][0] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data: Project[] = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleImageClick = (project: Project, image: Project['images'][0]) => {
        setSelectedProject(project);
        setSelectedImage(image);
    };

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
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
                        >
                            <Image
                                priority
                                src={project.images[0]?.url || '/placeholder.jpg'}
                                alt={project.title}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-400 line-clamp-3 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href={project.demoUrl || '#'} target="_blank">
                                        <Button
                                            size="sm"
                                            className="flex items-center"
                                            disabled={!project.demoUrl}
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />

                                            Demo

                                        </Button>
                                    </Link>
                                    <Link href={project.sourceUrl || '#'} target="_blank">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white"
                                            disabled={!project.sourceUrl}
                                        >
                                            <Code className="mr-2 h-4 w-4" />
                                            Code
                                        </Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={() => handleImageClick(project, project.images[0])}
                                    >
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        View Images
                                    </Button>
                                </div>
                                {/* Tech Stack Display */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.techStack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm font-medium bg-gray-700 text-white rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* View More Button */}
                <div className="mt-12 text-center">
                    <Button
                        size="lg"
                        className="bg-gray-800 hover:bg-blue-500 text-white"
                    >
                        <Link href="https://github.com/egboyguda" target="_blank">
                            View More on GitHub
                        </Link>
                    </Button>
                </div>
            </div>
            {selectedProject && selectedImage && (
                <ImageModal
                    project={selectedProject}
                    selectedImage={selectedImage}
                    onClose={() => setSelectedProject(null)}
                    onSelectImage={(image) => setSelectedImage(image)}
                />
            )}
        </motion.section>
    );
});

Projects.displayName = 'Projects';

export default Projects;

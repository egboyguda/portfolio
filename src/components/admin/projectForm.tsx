'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { TagInput } from './tagInput'

interface Project {
    id: string
    title: string
    description: string
    image: File | null
    imagePreview: string
    techStack: string[]
    demoUrl: string
    sourceUrl: string
}

export function ProjectsForm() {
    const [projects, setProjects] = useState<Project[]>([])
    const [currentProject, setCurrentProject] = useState<Project>({
        id: '',
        title: '',
        description: '',
        image: null,
        imagePreview: '',
        techStack: [],
        demoUrl: '',
        sourceUrl: '',
    })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        setCurrentProject(prev => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file)
        }))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCurrentProject(prev => ({ ...prev, [name]: value }))
    }

    const handleAddProject = () => {
        if (currentProject.title && currentProject.image) {
            setProjects(prev => [...prev, { ...currentProject, id: Date.now().toString() }])
            setCurrentProject({
                id: '',
                title: '',
                description: '',
                image: null,
                imagePreview: '',
                techStack: [],
                demoUrl: '',
                sourceUrl: '',
            })
        }
    }

    const handleRemoveProject = (id: string) => {
        setProjects(prev => prev.filter(project => project.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement API call to save projects
        console.log('Saving projects:', projects)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title" className="text-white">Project Title</Label>
                    <Input id="title" name="title" value={currentProject.title} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea id="description" name="description" value={currentProject.description} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label className="text-white mb-2 block">Project Image</Label>
                    <div
                        {...getRootProps()}
                        className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
                            }`}
                    >
                        <input {...getInputProps()} />
                        {currentProject.imagePreview ? (
                            <div className="relative w-full h-40">
                                <Image
                                    src={currentProject.imagePreview}
                                    alt="Project preview"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                {isDragActive ? 'Drop the image here' : 'Drag and drop project image here, or click to select'}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="techStack" className="text-white">Tech Stack</Label>
                    <TagInput
                        tags={currentProject.techStack}
                        setTags={(newTags) =>
                            setCurrentProject(prev => ({
                                ...prev,
                                techStack: Array.isArray(newTags) ? newTags : prev.techStack
                            }))
                        }
                    />
                </div>
                <div>
                    <Label htmlFor="demoUrl" className="text-white">Demo URL</Label>
                    <Input id="demoUrl" name="demoUrl" value={currentProject.demoUrl} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label htmlFor="sourceUrl" className="text-white">Source Code URL</Label>
                    <Input id="sourceUrl" name="sourceUrl" value={currentProject.sourceUrl} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <Button type="button" onClick={handleAddProject} className="bg-blue-600 hover:bg-blue-700 text-white">Add Project</Button>
            </div>
            <div>
                <h3 className="font-semibold mb-2 text-white">Current Projects:</h3>
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li key={project.id} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                            {project.imagePreview && (
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={project.imagePreview}
                                        alt={project.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            )}
                            <div className="flex-grow">
                                <h4 className="text-white font-medium">{project.title}</h4>
                                <p className="text-gray-400 text-sm">{project.description.substring(0, 100)}...</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveProject(project.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Projects</Button>
        </form>
    )
}


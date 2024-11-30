'use client'

import { useActionState, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { TagInput } from './tagInput'
import { addProject } from '@/actions'

interface Project {
    id: string
    title: string
    description: string
    images: File[]
    imagePreviews: string[]
    techStack: string[]
    demoUrl: string
    sourceUrl: string
}

export function ProjectsForm() {
    const [formState, action] = useActionState(addProject.bind(null), { errors: {} })
    const [projects, setProjects] = useState<Project[]>([])
    const [currentProject, setCurrentProject] = useState<Project>({
        id: '',
        title: '',
        description: '',
        images: [],
        imagePreviews: [],
        techStack: [],
        demoUrl: '',
        sourceUrl: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCurrentProject(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files)
            const previews = fileList.map(file => URL.createObjectURL(file))
            setCurrentProject(prev => ({
                ...prev,
                images: fileList,
                imagePreviews: previews
            }))
        }
    }

    const handleAddProject = () => {
        if (currentProject.title && currentProject.images.length > 0) {
            setProjects(prev => [...prev, { ...currentProject, id: Date.now().toString() }])
            setCurrentProject({
                id: '',
                title: '',
                description: '',
                images: [],
                imagePreviews: [],
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
        <form action={action} className="space-y-6">
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
                    <Label htmlFor="projectImages" className="text-white">Project Images</Label>
                    <Input
                        id="projectImages"
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        multiple
                        accept="image/*"
                        className="bg-gray-700 text-white border-gray-600"
                    />
                    {currentProject.imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {currentProject.imagePreviews.map((preview, index) => (
                                <div key={index} className="relative w-20 h-20">
                                    <Image
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
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
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Add Project</Button>
            </div>
            <div>
                <h3 className="font-semibold mb-2 text-white">Current Projects:</h3>
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li key={project.id} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                            {project.imagePreviews.length > 0 && (
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={project.imagePreviews[0]}
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
            {formState.errors.title && <p className="text-red-500">{formState.errors.title[0]}</p>}
            {formState.errors.description && <p className="text-red-500">{formState.errors.description[0]}</p>}
            {formState.errors.techStack && <p className="text-red-500">{formState.errors.techStack[0]}</p>}
            {formState.errors.demoUrl && <p className="text-red-500">{formState.errors.demoUrl[0]}</p>}
            {formState.errors.sourceUrl && <p className="text-red-500">{formState.errors.sourceUrl[0]}</p>}
            {formState.success && <p className="text-green-500">Project added successfully!</p>}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Projects</Button>
        </form>
    )
}


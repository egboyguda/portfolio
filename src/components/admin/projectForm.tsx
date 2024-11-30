'use client'

import { useState } from 'react'
import { useActionState } from 'react'
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

    const handleSubmit = async (formData: FormData) => {
        formData.append('techStack', JSON.stringify(currentProject.techStack))
        action(formData)
    }

    return (
        <form action={handleSubmit} className="space-y-6">
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
            </div>
            {formState.errors.title && <p className="text-red-500">{formState.errors.title[0]}</p>}
            {formState.errors.description && <p className="text-red-500">{formState.errors.description[0]}</p>}
            {formState.errors.techStack && <p className="text-red-500">{formState.errors.techStack[0]}</p>}
            {formState.errors.demoUrl && <p className="text-red-500">{formState.errors.demoUrl[0]}</p>}
            {formState.errors.sourceUrl && <p className="text-red-500">{formState.errors.sourceUrl[0]}</p>}
            {formState.success && <p className="text-green-500">Project added successfully!</p>}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Add Project</Button>
        </form>
    )
}


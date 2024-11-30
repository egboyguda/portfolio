'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        linkedin: '',
        github: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement API call to save personal info
        console.log('Saving personal info:', formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <div>
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <div>
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <div>
                <Label htmlFor="linkedin" className="text-white">LinkedIn URL</Label>
                <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <div>
                <Label htmlFor="github" className="text-white">GitHub URL</Label>
                <Input id="github" name="github" value={formData.github} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Personal Info</Button>
        </form>
    )
}


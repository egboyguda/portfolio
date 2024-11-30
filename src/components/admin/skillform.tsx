'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SkillsForm() {
    const [skills, setSkills] = useState<string[]>([])
    const [newSkill, setNewSkill] = useState('')

    const handleAddSkill = () => {
        if (newSkill.trim() !== '') {
            setSkills(prev => [...prev, newSkill.trim()])
            setNewSkill('')
        }
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(prev => prev.filter(skill => skill !== skillToRemove))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement API call to save skills
        console.log('Saving skills:', skills)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="newSkill" className="text-white">Add Skill</Label>
                <div className="flex space-x-2">
                    <Input
                        id="newSkill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill"
                        className="bg-gray-700 text-white border-gray-600"
                    />
                    <Button type="button" onClick={handleAddSkill} className="bg-blue-600 hover:bg-blue-700 text-white">Add</Button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2 text-white">Current Skills:</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {skills.map((skill, index) => (
                        <li key={index} className="flex justify-between items-center text-white">
                            {skill}
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveSkill(skill)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Skills</Button>
        </form>
    )
}


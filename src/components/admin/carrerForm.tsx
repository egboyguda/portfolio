'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CareerStep {
    id: string
    title: string
    company: string
    period: string
    description: string
}

export function CareerForm() {
    const [careerSteps, setCareerSteps] = useState<CareerStep[]>([])
    const [currentStep, setCurrentStep] = useState<CareerStep>({
        id: '',
        title: '',
        company: '',
        period: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCurrentStep(prev => ({ ...prev, [name]: value }))
    }

    const handleAddStep = () => {
        if (currentStep.title && currentStep.company) {
            setCareerSteps(prev => [...prev, { ...currentStep, id: Date.now().toString() }])
            setCurrentStep({
                id: '',
                title: '',
                company: '',
                period: '',
                description: '',
            })
        }
    }

    const handleRemoveStep = (id: string) => {
        setCareerSteps(prev => prev.filter(step => step.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement API call to save career steps
        console.log('Saving career steps:', careerSteps)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title" className="text-white">Job Title</Label>
                    <Input id="title" name="title" value={currentStep.title} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label htmlFor="company" className="text-white">Company</Label>
                    <Input id="company" name="company" value={currentStep.company} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label htmlFor="period" className
                        ="text-white">Period</Label>
                    <Input id="period" name="period" value={currentStep.period} onChange={handleChange} placeholder="e.g., 2020 - 2022" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea id="description" name="description" value={currentStep.description} onChange={handleChange} className="bg-gray-700 text-white border-gray-600" />
                </div>
                <Button type="button" onClick={handleAddStep} className="bg-blue-600 hover:bg-blue-700 text-white">Add Career Step</Button>
            </div>
            <div>
                <h3 className="font-semibold mb-2 text-white">Current Career Steps:</h3>
                <ul className="space-y-2">
                    {careerSteps.map((step) => (
                        <li key={step.id} className="flex justify-between items-center text-white">
                            {step.title} at {step.company}
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveStep(step.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Career Steps</Button>
        </form>
    )
}


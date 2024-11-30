import React, { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TagInputProps {
    tags: string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export function TagInput({ tags, setTags }: TagInputProps) {
    const [input, setInput] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input) {
            e.preventDefault()
            addTag(input)
        }
    }

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim()
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag])
            setInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm flex items-center"
                    >
                        {tag}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-5 w-5 p-0 text-white hover:bg-blue-700 rounded-full"
                            onClick={() => removeTag(tag)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                        </Button>
                    </span>
                ))}
            </div>
            <Input
                name='tag'
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add a tag and press Enter"
                className="bg-gray-700 text-white border-gray-600"
            />
        </div>
    )
}


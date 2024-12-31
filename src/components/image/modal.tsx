import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ProjectImage {
    id: string;
    url: string;
    projectId: string;
    public_id: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    images: ProjectImage[];
}

interface ImageModalProps {
    project: Project;
    selectedImage: ProjectImage;
    onClose: () => void;
    onSelectImage: (image: ProjectImage) => void;
}

export function ImageModal({ project, selectedImage, onClose, onSelectImage }: ImageModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="bg-gray-800 rounded-lg p-4 w-full max-w-6xl max-h-[90vh] overflow-auto">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-2/3">
                        <Image
                            src={selectedImage.url}
                            alt={project.title}
                            width={800}
                            height={600}
                            priority
                            className="rounded-lg object-cover w-full h-auto"
                        />
                        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                            {project.images.map((image) => (
                                <button
                                    key={image.id}
                                    onClick={() => onSelectImage(image)}
                                    className={`flex-shrink-0 ${selectedImage.id === image.id ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                >
                                    <Image
                                        src={image.url}
                                        alt={project.title}
                                        width={100}
                                        height={67}
                                        className="rounded object-cover w-24 h-16"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">{project.title}</h2>
                        <p className="text-slate-200">{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

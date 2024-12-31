
'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const skills = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
    'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Git', 'Docker', 'AWS', 'Bash', 'Networking', 'Linux', 'Python', 'Django', 'React Native'
]

const Skills = forwardRef<HTMLElement>((props, ref) => {
    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6 bg-gray-800"
        >
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-700 rounded-lg p-4 text-center"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
})

Skills.displayName = 'Skills'

export default Skills


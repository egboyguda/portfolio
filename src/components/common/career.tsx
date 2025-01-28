'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const careerSteps = [
    
    {
        title: 'Project Site Engineer',
        company: 'Centrifugal Machineries and Services Inc.',
        period: 'February 2023 - July 2024',
        description: 'Responsible of Managing the Projects on the Site'
    },

]

const Career = forwardRef<HTMLElement>((props, ref) => {
    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6 bg-gray-800"
        >
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-bold mb-12 text-center">Career Timeline</h2>
                <div className="relative">
                    {careerSteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="mb-8 flex"
                        >
                            <div className="flex flex-col items-center mr-4">
                                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                                {index !== careerSteps.length - 1 && <div className="w-1 h-full bg-blue-600"></div>}
                            </div>
                            <div className="bg-gray-700 rounded-lg p-6 flex-1">
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-blue-400 mb-2">{step.company}</p>
                                <p className="text-gray-400 mb-2">{step.period}</p>
                                <p>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
})

Career.displayName = 'Career'

export default Career


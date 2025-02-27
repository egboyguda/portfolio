"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import Link from "next/link";

const About = forwardRef<HTMLElement>((props, ref) => {
    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6"
        >
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-64 h-64 relative rounded-full overflow-hidden"
                >
                    <Image
                        src={
                            "https://res.cloudinary.com/dzunpwyao/image/upload/t_dd/v1731218752/2_x_2_inch_ks2jfs.png"
                        }
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-xl mb-6">
                        Hi, I&lsquo;m EG Boy Guda, a licensed Mechanical Engineer transitioning
                        into software development. As a Self-taught Developer, I&lsquo;m actively
                        seeking opportunities to apply my problem-solving skills and passion
                        for technology in the software industry. Ready to contribute and
                        grow in a dynamic team!
                    </p>
                    <Link target="_blank" href={"https://res.cloudinary.com/dzunpwyao/image/upload/v1735618583/CV_2024123112153384_mre0gn.pdf"}>
                        <Button className="inline-flex items-center">
                            <FileDown className="mr-2 h-4 w-4" /> Download Resume
                        </Button></Link>

                </div>
            </div>
        </motion.section>
    );
});

About.displayName = "About";

export default About;

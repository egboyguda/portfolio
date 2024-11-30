import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/admin/personalForm"
import { SkillsForm } from "@/components/admin/skillform"
import { ProjectsForm } from "@/components/admin/projectForm"
import { CareerForm } from "@/components/admin/carrerForm"


export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <Tabs defaultValue="personal-info" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                        <TabsTrigger value="personal-info" className="data-[state=active]:bg-gray-700">Personal Info</TabsTrigger>
                        <TabsTrigger value="skills" className="data-[state=active]:bg-gray-700">Skills</TabsTrigger>
                        <TabsTrigger value="projects" className="data-[state=active]:bg-gray-700">Projects</TabsTrigger>
                        <TabsTrigger value="career" className="data-[state=active]:bg-gray-700">Career</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal-info" className="bg-gray-800 p-6 rounded-lg">
                        <PersonalInfoForm />
                    </TabsContent>
                    <TabsContent value="skills" className="bg-gray-800 p-6 rounded-lg">
                        <SkillsForm />
                    </TabsContent>
                    <TabsContent value="projects" className="bg-gray-800 p-6 rounded-lg">
                        <ProjectsForm />
                    </TabsContent>
                    <TabsContent value="career" className="bg-gray-800 p-6 rounded-lg">
                        <CareerForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


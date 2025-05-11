import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Briefcase,
  LineChart,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ResumeUploader from "../components/ResumeUploader";
import JobMatchList from "../components/JobMatchList";
import SkillGapAnalysis from "../components/SkillGapAnalysis";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { signOut, getInitials } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  // User profile data (combine auth user with profile data)
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    avatar: user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "User"}",
    profileCompletion: 85,
    resumeUploaded: true,
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"],
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2020 - Present",
      },
      {
        title: "Web Developer",
        company: "Digital Creations",
        duration: "2018 - 2020",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "State University",
        year: "2018",
      },
    ],
    jobMatches: 24,
    savedJobs: 5,
    applications: 3,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <motion.div 
      className="min-h-screen bg-background flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {/* Sidebar */}
      <motion.div 
        className="w-64 border-r bg-card p-4 flex flex-col"
        variants={itemVariants}
        <div className="text-2xl font-bold mb-8 text-primary">ResuMatch</div>

        <nav className="space-y-2 flex-1">
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>

          <Button
            variant={activeTab === "jobs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Job Matches
            <Badge className="ml-auto" variant="secondary">
              {user.jobMatches}
            </Badge>
          </Button>

          <Button
            variant={activeTab === "skills" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("skills")}
          >
            <LineChart className="mr-2 h-4 w-4" />
            Skill Analysis
          </Button>

          <Button
            variant={activeTab === "learning" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("learning")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Learning Resources
          </Button>
        </nav>

        <div className="pt-4 border-t mt-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col"
        variants={itemVariants}
        {/* Header */}
        <motion.header 
          className="border-b p-4 flex justify-between items-center bg-card"
          variants={itemVariants}
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <motion.main 
          className="flex-1 p-6 overflow-auto"
          variants={itemVariants}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="jobs">Job Matches</TabsTrigger>
              <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
              <TabsTrigger value="learning">Learning Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <Card className="md:col-span-1">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback className="text-2xl">
                          {getInitials(profile.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <p className="text-muted-foreground mb-4">{profile.email}</p>

                      <div className="w-full mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Profile Completion</span>
                          <span className="text-sm font-medium">
                            {profile.profileCompletion}%
                          </span>
                        </div>
                        <Progress
                          value={profile.profileCompletion}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center">
                        <div className="p-2 rounded-md bg-muted">
                          <p className="text-2xl font-bold">
                            {profile.jobMatches}
                          </p>
                          <p className="text-xs">Matches</p>
                        </div>
                        <div className="p-2 rounded-md bg-muted">
                          <p className="text-2xl font-bold">{profile.savedJobs}</p>
                          <p className="text-xs">Saved</p>
                        </div>
                        <div className="p-2 rounded-md bg-muted">
                          <p className="text-2xl font-bold">
                            {profile.applications}
                          </p>
                          <p className="text-xs">Applied</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Section */}
                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Resume</h2>
                    {profile.resumeUploaded ? (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="font-medium">resume.pdf</p>
                            <p className="text-sm text-muted-foreground">
                              Last updated: May 15, 2023
                            </p>
                          </div>
                          <Button>Update Resume</Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {profile.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-2">Experience</h3>
                            <div className="space-y-2">
                              {profile.experience.map((exp, index) => (
                                <motion.div
                                  key={index}
                                  className="border-l-2 border-primary pl-4"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <p className="font-medium">{exp.title}</p>
                                  <p className="text-sm">{exp.company}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {exp.duration}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-2">Education</h3>
                            <div className="space-y-2">
                              {profile.education.map((edu, index) => (
                                <motion.div
                                  key={index}
                                  className="border-l-2 border-primary pl-4"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <p className="font-medium">{edu.degree}</p>
                                  <p className="text-sm">{edu.institution}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {edu.year}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ResumeUploader />
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs">
              <JobMatchList />
            </TabsContent>

            <TabsContent value="skills">
              <SkillGapAnalysis />
            </TabsContent>

            <TabsContent value="learning">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">
                    Recommended Learning Resources
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Based on your skill gaps and career goals
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sample learning resources */}
                    {[
                      {
                        title: "Advanced React Patterns",
                        provider: "Frontend Masters",
                        duration: "6 hours",
                        image:
                          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&q=80",
                      },
                      {
                        title: "TypeScript Deep Dive",
                        provider: "Udemy",
                        duration: "8 hours",
                        image:
                          "https://images.unsplash.com/photo-1613068687893-5e85b4638b56?w=300&q=80",
                      },
                      {
                        title: "AWS for Frontend Developers",
                        provider: "Coursera",
                        duration: "12 hours",
                        image:
                          "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&q=80",
                      },
                    ].map((resource, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="h-40 overflow-hidden">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.provider}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs">{resource.duration}</span>
                            <Button size="sm">Start Learning</Button>
                          </div>
                        </CardContent>
                      </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.main>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, BookOpen, Award, ArrowUpRight } from "lucide-react";

interface Skill {
  name: string;
  userLevel: number;
  requiredLevel: number;
  gap: number;
}

interface Course {
  title: string;
  provider: string;
  duration: string;
  level: string;
  url: string;
}

interface SkillGapAnalysisProps {
  skills?: Skill[];
  courses?: Course[];
  jobTitle?: string;
}

const SkillGapAnalysis = ({
  skills = [
    { name: "React", userLevel: 80, requiredLevel: 90, gap: 10 },
    { name: "TypeScript", userLevel: 70, requiredLevel: 85, gap: 15 },
    { name: "Node.js", userLevel: 60, requiredLevel: 80, gap: 20 },
    { name: "GraphQL", userLevel: 40, requiredLevel: 75, gap: 35 },
    { name: "AWS", userLevel: 30, requiredLevel: 70, gap: 40 },
    { name: "Docker", userLevel: 50, requiredLevel: 65, gap: 15 },
  ],
  courses = [
    {
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      duration: "6 hours",
      level: "Advanced",
      url: "https://frontendmasters.com/courses/advanced-react-patterns/",
    },
    {
      title: "TypeScript Deep Dive",
      provider: "Udemy",
      duration: "12 hours",
      level: "Intermediate",
      url: "https://www.udemy.com/course/typescript-deep-dive/",
    },
    {
      title: "GraphQL Fundamentals",
      provider: "Pluralsight",
      duration: "4 hours",
      level: "Beginner",
      url: "https://www.pluralsight.com/courses/graphql-fundamentals",
    },
    {
      title: "AWS Certified Developer",
      provider: "A Cloud Guru",
      duration: "20 hours",
      level: "Intermediate",
      url: "https://acloudguru.com/course/aws-certified-developer-associate",
    },
  ],
  jobTitle = "Senior Frontend Developer",
}: SkillGapAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("skills");

  // Sort skills by gap (largest gap first)
  const sortedSkills = [...skills].sort((a, b) => b.gap - a.gap);

  // Calculate overall match percentage
  const calculateMatchPercentage = () => {
    const totalGap = skills.reduce((sum, skill) => sum + skill.gap, 0);
    const maxPossibleGap = skills.reduce((sum, skill) => sum + 100, 0);
    return Math.round(100 - (totalGap / maxPossibleGap) * 100);
  };

  const matchPercentage = calculateMatchPercentage();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-background">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Skill Gap Analysis</CardTitle>
              <CardDescription>
                Compare your skills with the requirements for {jobTitle}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">{matchPercentage}%</div>
              <div className="text-sm text-muted-foreground">Overall Match</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="skills"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
              <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-6">
              <div className="space-y-4">
                {sortedSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{skill.name}</div>
                      <Badge
                        variant={skill.gap > 20 ? "destructive" : "outline"}
                      >
                        {skill.gap > 0 ? `${skill.gap}% Gap` : "Proficient"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground w-20">
                        Your Level
                      </div>
                      <Progress value={skill.userLevel} className="h-2" />
                      <div className="text-xs w-8">{skill.userLevel}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground w-20">
                        Required
                      </div>
                      <Progress value={skill.requiredLevel} className="h-2" />
                      <div className="text-xs w-8">{skill.requiredLevel}%</div>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Generate Improvement Plan
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              {courses.map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold">{course.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            <span>{course.provider}</span>
                          </div>
                          <div>{course.duration}</div>
                          <Badge variant="secondary" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0"
                        asChild
                      >
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Course
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-4 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  View All Learning Resources
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGapAnalysis;

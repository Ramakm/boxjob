import React from "react";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  match: boolean;
  strength?: number;
}

interface JobDetailViewProps {
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    matchPercentage: number;
    skills: Skill[];
    postedDate: string;
    applicationDeadline: string;
    isSaved: boolean;
  };
  onBack?: () => void;
  onSave?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}

const JobDetailView: React.FC<JobDetailViewProps> = ({
  job = {
    id: "job-123",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building responsive web applications and collaborating with cross-functional teams to deliver exceptional user experiences.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience with React.js",
      "Strong understanding of JavaScript, HTML5, and CSS3",
      "Experience with state management libraries (Redux, MobX)",
      "Knowledge of responsive design and cross-browser compatibility",
    ],
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers and designers",
      "Participate in code reviews and mentor junior developers",
    ],
    matchPercentage: 85,
    skills: [
      { name: "React.js", match: true, strength: 90 },
      { name: "JavaScript", match: true, strength: 85 },
      { name: "TypeScript", match: true, strength: 80 },
      { name: "HTML/CSS", match: true, strength: 95 },
      { name: "Redux", match: false },
      { name: "Responsive Design", match: true, strength: 75 },
      { name: "Git", match: true, strength: 85 },
      { name: "Jest", match: false },
    ],
    postedDate: "2023-06-15",
    applicationDeadline: "2023-07-15",
    isSaved: false,
  },
  onBack = () => {},
  onSave = () => {},
  onApply = () => {},
}) => {
  return (
    <div className="bg-background w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to listings
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <CardDescription className="text-lg">
                {job.company} • {job.location}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSave(job.id)}
              >
                {job.isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Job
                  </>
                )}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share job</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">Match Score:</span>
              <span className="font-bold text-lg">{job.matchPercentage}%</span>
            </div>
            <Progress value={job.matchPercentage} className="h-2 mt-1" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <p>{job.salary}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground">{job.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="text-muted-foreground">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="text-muted-foreground">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Skills Match</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant={skill.match ? "default" : "outline"}
                  className={
                    skill.match
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : ""
                  }
                >
                  {skill.name}
                  {skill.match && skill.strength && (
                    <span className="ml-1 text-xs">({skill.strength}%)</span>
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>Posted: {job.postedDate}</div>
            <div>Application Deadline: {job.applicationDeadline}</div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={() => onApply(job.id)}>
            Apply Now
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetailView;

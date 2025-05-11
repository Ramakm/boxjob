import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import JobDetailView from "./JobDetailView";

interface Skill {
  name: string;
  matched: boolean;
  match?: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  skills: Skill[];
  description: string;
  salary: string;
  postedDate: string;
}

interface JobMatchListProps {
  jobs?: Job[];
}

const JobMatchList = ({ jobs = [] }: JobMatchListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minMatchPercentage, setMinMatchPercentage] = useState(50);
  const [sortBy, setSortBy] = useState("matchPercentage");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Mock data if no jobs are provided
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      matchPercentage: 92,
      skills: [
        { name: "React", matched: true },
        { name: "TypeScript", matched: true },
        { name: "Tailwind CSS", matched: true },
        { name: "GraphQL", matched: false },
      ],
      description:
        "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and TypeScript.",
      salary: "$120,000 - $150,000",
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "InnovateTech",
      location: "Remote",
      matchPercentage: 85,
      skills: [
        { name: "React", matched: true },
        { name: "Node.js", matched: true },
        { name: "MongoDB", matched: false },
        { name: "AWS", matched: true },
      ],
      description:
        "Join our team as a Full Stack Engineer to work on exciting projects using modern technologies.",
      salary: "$130,000 - $160,000",
      postedDate: "1 week ago",
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "Creative Designs Co.",
      location: "New York, NY",
      matchPercentage: 78,
      skills: [
        { name: "Figma", matched: true },
        { name: "Adobe XD", matched: true },
        { name: "User Research", matched: false },
        { name: "Prototyping", matched: true },
      ],
      description:
        "We are seeking a talented UI/UX Designer to create beautiful and functional user interfaces for our products.",
      salary: "$100,000 - $130,000",
      postedDate: "3 days ago",
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Data Systems Ltd.",
      location: "Austin, TX",
      matchPercentage: 72,
      skills: [
        { name: "Python", matched: true },
        { name: "Django", matched: false },
        { name: "PostgreSQL", matched: true },
        { name: "Docker", matched: false },
      ],
      description:
        "Looking for a Backend Developer to build robust APIs and services using Python and related technologies.",
      salary: "$115,000 - $140,000",
      postedDate: "5 days ago",
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      location: "Seattle, WA",
      matchPercentage: 68,
      skills: [
        { name: "Kubernetes", matched: true },
        { name: "Terraform", matched: false },
        { name: "AWS", matched: true },
        { name: "CI/CD", matched: true },
      ],
      description:
        "Join our DevOps team to build and maintain our cloud infrastructure and deployment pipelines.",
      salary: "$125,000 - $155,000",
      postedDate: "1 week ago",
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA",
      matchPercentage: 65,
      skills: [
        { name: "Python", matched: true },
        { name: "Machine Learning", matched: true },
        { name: "SQL", matched: false },
        { name: "TensorFlow", matched: false },
      ],
      description:
        "We are looking for a Data Scientist to analyze complex data and build predictive models.",
      salary: "$130,000 - $160,000",
      postedDate: "2 weeks ago",
    },
  ];

  const displayJobs = jobs.length > 0 ? jobs : mockJobs;

  // Filter jobs based on search term and match percentage
  const filteredJobs = displayJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPercentage = job.matchPercentage >= minMatchPercentage;
    return matchesSearch && matchesPercentage;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "matchPercentage") {
      return sortDirection === "desc"
        ? b.matchPercentage - a.matchPercentage
        : a.matchPercentage - b.matchPercentage;
    } else if (sortBy === "title") {
      return sortDirection === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    } else if (sortBy === "company") {
      return sortDirection === "desc"
        ? b.company.localeCompare(a.company)
        : a.company.localeCompare(b.company);
    }
    return 0;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleJobClick = (job: Job) => {
    // Convert the job to match JobDetailView's expected format
    const convertedJob = {
      ...job,
      requirements: [
        "Experience with modern JavaScript frameworks",
        "Knowledge of responsive design principles",
        "Strong problem-solving skills",
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Optimize application performance",
      ],
      applicationDeadline: "Not specified",
      isSaved: false,
      skills: job.skills.map((skill) => ({
        name: skill.name,
        match: skill.matched,
        strength: skill.matched
          ? Math.floor(Math.random() * 30) + 70
          : undefined,
      })),
    };
    setSelectedJob(convertedJob);
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
  };

  return (
    <div className="bg-background w-full">
      {selectedJob ? (
        <JobDetailView job={selectedJob} onClose={handleCloseJobDetail} />
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Job Matches</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Match: {minMatchPercentage}%+
                    </span>
                  </div>
                  <Slider
                    value={[minMatchPercentage]}
                    onValueChange={(value) => setMinMatchPercentage(value[0])}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matchPercentage">
                        Match Percentage
                      </SelectItem>
                      <SelectItem value="title">Job Title</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSortDirection}
                  >
                    {sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentJobs.length > 0 ? (
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleJobClick(job)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-muted-foreground">
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.company}</span>
                            </div>
                            <div className="hidden sm:block">•</div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant={skill.matched ? "default" : "outline"}
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-lg font-bold">
                              {job.matchPercentage}%
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground mt-1">
                            Match
                          </span>
                          <span className="text-sm text-muted-foreground mt-2">
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages),
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No matching jobs found
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search criteria or match percentage filter
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobMatchList;

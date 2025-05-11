import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileUp, CheckCircle, AlertCircle, Trash2 } from "lucide-react";

interface ResumeUploaderProps {
  onUploadComplete?: (resumeData: any) => void;
  onError?: (error: string) => void;
}

const ResumeUploader = ({
  onUploadComplete = () => {},
  onError = () => {},
}: ResumeUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "parsing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFileType(droppedFile)) {
      setFile(droppedFile);
      setErrorMessage("");
    } else {
      setErrorMessage("Please upload a PDF, DOCX, or TXT file.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
      setErrorMessage("");
    } else if (selectedFile) {
      setErrorMessage("Please upload a PDF, DOCX, or TXT file.");
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    return validTypes.includes(file.type);
  };

  const handleUpload = () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("parsing");
          simulateParsing();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateParsing = () => {
    // Simulate resume parsing
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setStatus("success");
        onUploadComplete({
          name: "John Doe",
          email: "john.doe@example.com",
          skills: ["JavaScript", "React", "TypeScript", "Node.js"],
          experience: [
            {
              title: "Frontend Developer",
              company: "Tech Co",
              duration: "2020-Present",
            },
            {
              title: "Junior Developer",
              company: "Startup Inc",
              duration: "2018-2020",
            },
          ],
          education: [
            {
              degree: "B.S. Computer Science",
              institution: "University of Technology",
              year: "2018",
            },
          ],
        });
      } else {
        setStatus("error");
        setErrorMessage(
          "Unable to parse resume. Please try a different file or format.",
        );
        onError("Parse failed");
      }
    }, 2000);
  };

  const resetUploader = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload Your Resume</CardTitle>
        <CardDescription>
          Upload your resume to find matching job opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "idle" && (
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">
                {file ? file.name : "Drag & drop your resume here"}
              </p>
              <p className="text-xs text-gray-500">
                {!file && "or click to browse (PDF, DOCX, TXT)"}
              </p>
              <Input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileChange}
              />
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {(status === "uploading" || status === "parsing") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {status === "uploading" ? "Uploading..." : "Parsing resume..."}
              </span>
              <span className="text-xs text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 text-center mt-2">
              {status === "uploading"
                ? "Uploading your resume..."
                : "Analyzing your skills and experience..."}
            </p>
          </div>
        )}

        {status === "success" && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Success!</AlertTitle>
            <AlertDescription className="text-green-600">
              Your resume has been successfully uploaded and parsed.
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {status === "idle" && (
          <Button onClick={handleUpload} disabled={!file} className="w-full">
            <FileUp className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        )}

        {(status === "uploading" || status === "parsing") && (
          <Button disabled className="w-full">
            Processing...
          </Button>
        )}

        {(status === "success" || status === "error") && (
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={resetUploader}
              className="flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Reset
            </Button>
            {status === "error" && (
              <Button onClick={handleUpload} className="flex-1">
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeUploader;

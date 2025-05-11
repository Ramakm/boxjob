import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-8">ResuMatch</h1>
      <p className="text-xl mb-8 max-w-md text-center">
        Find the perfect job match based on your resume and skills
      </p>
      <Button size="lg" onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </Button>
    </div>
  );
}

export default Home;

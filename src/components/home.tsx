import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Spotlight className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <AnimatedGradient className="max-w-4xl w-full px-4">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            variants={itemVariants}
          >
            ResuMatch
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl text-center text-foreground/80"
            variants={itemVariants}
          >
            Find the perfect job match based on your resume and skills using our
            AI-powered platform
          </motion.p>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <Button
              size="lg"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg transition-all hover:shadow-lg"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </Button>

            {!user && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="px-8 py-6 text-lg rounded-lg border-2 transition-all hover:shadow-lg"
              >
                Sign In
              </Button>
            )}
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            variants={itemVariants}
          >
            {[
              {
                title: "Resume Analysis",
                description:
                  "Upload your resume and get instant feedback on your skills and experience",
              },
              {
                title: "Job Matching",
                description:
                  "Find jobs that match your skills and experience with our AI-powered matching engine",
              },
              {
                title: "Skill Development",
                description:
                  "Identify skill gaps and get personalized recommendations for improvement",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
                }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatedGradient>
    </Spotlight>
  );
}

export default Home;

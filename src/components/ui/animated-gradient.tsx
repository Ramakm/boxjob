import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children: React.ReactNode;
}

export function AnimatedGradient({
  className,
  children,
}: AnimatedGradientProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-x"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

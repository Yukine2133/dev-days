import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import { RefAttributes } from "react";

interface CommitStatsCardProps {
  Icon: React.ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  >;
  label: string;
  children: React.ReactNode;
  className?: string;
  delay: number;
}

export const CommitStatsCard = ({
  Icon,
  children,
  label,
  className,
  delay,
}: CommitStatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`bg-zinc-800/50 border-zinc-700 ${className}  `}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-zinc-100 text-sm font-medium">
            {label}
          </CardTitle>
          <Icon className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
};

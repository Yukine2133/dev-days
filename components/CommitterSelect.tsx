import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

interface CommitterSelectProps {
  selectedCommitter?: string;
  setSelectedCommitter: (value: string | undefined) => void;
  committers: string[];
}

export function CommitterSelect({
  selectedCommitter,
  setSelectedCommitter,
  committers,
}: CommitterSelectProps) {
  return (
    <div className="relative mt-6">
      <Select
        value={selectedCommitter}
        onValueChange={(value) =>
          setSelectedCommitter(value === "All committers" ? undefined : value)
        }
      >
        <SelectTrigger className="w-full bg-zinc-800/50 border-zinc-700 text-zinc-100 hover:bg-zinc-800  transition-colors">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            <SelectValue placeholder="Select committer" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700">
          <SelectItem
            value="All committers"
            className="text-zinc-100 focus:bg-purple-500/10 focus:text-purple-400"
          >
            All Committers
          </SelectItem>
          {committers.map((committer) => (
            <SelectItem
              key={committer}
              value={committer}
              className="text-zinc-100 focus:bg-purple-500/10 focus:text-purple-400"
            >
              {committer}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

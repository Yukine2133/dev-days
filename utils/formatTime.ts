export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const formatHour = (hour: number): string => {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
};

export const formatCommitDate = (maxCommitDate: string) => {
  if (maxCommitDate) {
    return new Date(maxCommitDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return "";
};

export const getTimeAgo = (date: string) => {
  const now = new Date();
  const commitDate = new Date(date);
  const diffInDays = Math.floor(
    (now.getTime() - commitDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

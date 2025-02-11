import { useMemo } from "react";

export const useCommitActivityAnalysis = (
  commitCountByHour: Record<string, number>
) => {
  return useMemo(() => {
    const mostActiveHour = Object.entries(commitCountByHour).reduce(
      (acc, [hour, count]) => {
        const numericHour = Number(hour);
        return count > acc.count ? { hour: numericHour, count } : acc;
      },
      { hour: 0, count: 0 }
    );

    const timeCategories = {
      morning: 0, // 6 AM - 12 PM
      afternoon: 0, // 12 PM - 6 PM
      evening: 0, // 6 PM - 12 AM
      night: 0, // 12 AM - 6 AM
    };

    Object.entries(commitCountByHour).forEach(([hour, count]) => {
      const numericHour = Number(hour);
      switch (true) {
        case numericHour >= 6 && numericHour < 12:
          timeCategories.morning += count;
          break;
        case numericHour >= 12 && numericHour < 18:
          timeCategories.afternoon += count;
          break;
        case numericHour >= 18 && numericHour < 24:
          timeCategories.evening += count;
          break;
        default:
          timeCategories.night += count;
          break;
      }
    });

    const mostActiveTimePeriod = Object.entries(timeCategories).reduce(
      (acc, [period, count]) => {
        return count > acc.count ? { period, count } : acc;
      },
      { period: "", count: 0 }
    );

    const leastActiveTimePeriod = Object.entries(timeCategories).reduce(
      (acc, [period, count]) => {
        return count < acc.count ? { period, count } : acc;
      },
      { period: "", count: Infinity }
    );

    const timeLabels: Record<string, string> = {
      morning: "Morning (6 AM - 12 PM)",
      afternoon: "Afternoon (12 PM - 6 PM)",
      evening: "Evening (6 PM - 12 AM)",
      night: "Night (12 AM - 6 AM)",
    };

    return {
      mostActiveHour,
      mostActiveTimePeriod,
      leastActiveTimePeriod,
      timeLabels,
    };
  }, [commitCountByHour]);
};

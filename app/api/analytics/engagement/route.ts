import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Mock data for when external API is unavailable
const mockEngagementData = {
  dailyActiveUsers: 3240,
  weeklyActiveUsers: 8920,
  monthlyActiveUsers: 12450,
  averageSessionDuration: 28.5,
  sessionData: [
    { date: "2024-01-01", sessions: 2850, duration: 25.2 },
    { date: "2024-01-02", sessions: 3120, duration: 27.8 },
    { date: "2024-01-03", sessions: 2980, duration: 26.1 },
    { date: "2024-01-04", sessions: 3240, duration: 28.5 },
    { date: "2024-01-05", sessions: 3560, duration: 30.2 },
    { date: "2024-01-06", sessions: 3780, duration: 31.8 },
    { date: "2024-01-07", sessions: 3920, duration: 32.5 }
  ],
  topEngagementMetrics: [
    { metric: "Quiz Completions", value: 15680, change: 12.5 },
    { metric: "Study Sessions", value: 23450, change: 8.7 },
    { metric: "Flashcard Reviews", value: 45620, change: 15.3 },
    { metric: "Time Spent", value: 8920, change: 6.2 }
  ]
};

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/analytics/engagement");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for analytics engagement - external API unavailable");
    return NextResponse.json(mockEngagementData);
  }
}
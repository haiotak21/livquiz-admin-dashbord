import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Updated mock data to match frontend expectations
const mockDashboardData = {
  metrics: [
    { id: "total_users", value: 12450, change: 5.2 },
    { id: "active_quizzes", value: 3200, change: 2.1 },
    { id: "total_flashcards", value: 45600, change: 3.8 },
    { id: "total_study_sets", value: 1340, change: 1.5 },
    { id: "monthly_revenue", value: 89250, change: 4.7 },
    { id: "active_users", value: 8920, change: 2.9 },
    { id: "arpu", value: 7.25, change: 0.8 },
    { id: "total_content_sets", value: 980, change: 1.2 },
    { id: "avg_study_time", value: 28, change: 0.5 },
    { id: "completion_rate", value: 87, change: 1.1 },
    { id: "exams", value: 120, change: -0.5 },
    { id: "total_quizzes", value: 1560, change: 2.3 }
  ]
};

export async function GET() {
  try {
    // Try to fetch from external API
    const { data } = await apiClient.get("/api/dashboard/overview");
    return NextResponse.json(data);
  } catch (error) {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log("📊 Using mock data for dashboard overview");
    }
    // Return mock data when external API fails
    return NextResponse.json(mockDashboardData);
  }
}

import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Updated mock data to match frontend expectations
const mockTrendsData = {
  userGrowth: [
    { month: "Jan", users: 8500, growth: 0 },
    { month: "Feb", users: 9200, growth: 8.2 },
    { month: "Mar", users: 10100, growth: 9.8 },
    { month: "Apr", users: 11200, growth: 10.9 },
    { month: "May", users: 11800, growth: 5.4 },
    { month: "Jun", users: 12450, growth: 5.5 }
  ],
  revenueGrowth: [
    { month: "Jan", revenue: 320000, growth: 0 },
    { month: "Feb", revenue: 345000, growth: 7.8 },
    { month: "Mar", revenue: 378000, growth: 9.6 },
    { month: "Apr", revenue: 412000, growth: 9.0 },
    { month: "May", revenue: 435000, growth: 5.6 },
    { month: "Jun", revenue: 456780, growth: 5.0 }
  ],
  subjectPopularity: [
    { subject: "Mathematics", popularity: 85, change: 12 },
    { subject: "Physics", popularity: 72, change: 8 },
    { subject: "Chemistry", popularity: 68, change: -3 },
    { subject: "Biology", popularity: 65, change: 15 },
    { subject: "Computer Science", popularity: 58, change: 22 }
  ],
  // Add TrendData structure for user trends
  user: {
    total: 12450,
    growth: "+12.5%",
    data: [
      { month: "Jan", value: 8500 },
      { month: "Feb", value: 9200 },
      { month: "Mar", value: 10100 },
      { month: "Apr", value: 11200 },
      { month: "May", value: 11800 },
      { month: "Jun", value: 12450 }
    ]
  },
  // Add TrendData structure for revenue trends
  revenue: {
    total: 456780,
    growth: "+8.7%",
    data: [
      { month: "Jan", value: 320000 },
      { month: "Feb", value: 345000 },
      { month: "Mar", value: 378000 },
      { month: "Apr", value: 412000 },
      { month: "May", value: 435000 },
      { month: "Jun", value: 456780 }
    ]
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const { data } = await apiClient.get(`/api/dashboard/trends?type=${type}`);
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for dashboard trends - external API unavailable");
    // Return the appropriate trend data based on type
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'user') {
      return NextResponse.json(mockTrendsData.user);
    } else if (type === 'revenue') {
      return NextResponse.json(mockTrendsData.revenue);
    } else {
      return NextResponse.json(mockTrendsData);
    }
  }
}
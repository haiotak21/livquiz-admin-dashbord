import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Updated mock data to match frontend expectations
const mockRevenueData = {
  metrics: {
    stats: [
      {
        id: "total_revenue",
        title: "Total Revenue",
        value: 456780,
        currency: "USD",
        trend: "up",
        change: "+12.5%",
        timeframe: "this year"
      },
      {
        id: "active_subscriptions",
        title: "Active Subscriptions",
        value: 892,
        trend: "up",
        change: "+8.7%",
        timeframe: "this month"
      },
      {
        id: "avg_transaction",
        title: "Avg. Transaction",
        value: 367.29,
        currency: "USD",
        trend: "down",
        change: "-2.1%",
        timeframe: "this month"
      },
      {
        id: "one_time_purchases",
        title: "One-Time Purchases",
        value: 353,
        trend: "up",
        change: "+5.4%",
        timeframe: "this month"
      }
    ]
  },
  trends: {
    breakdown: [
      { date: "2024-01-01", subscriptions: 12000, one_time: 3500, premium_content: 2000 },
      { date: "2024-02-01", subscriptions: 13500, one_time: 4000, premium_content: 2500 },
      { date: "2024-03-01", subscriptions: 15000, one_time: 4200, premium_content: 3000 },
      { date: "2024-04-01", subscriptions: 16000, one_time: 4100, premium_content: 3200 },
      { date: "2024-05-01", subscriptions: 17000, one_time: 4300, premium_content: 3500 },
      { date: "2024-06-01", subscriptions: 18000, one_time: 4400, premium_content: 3700 }
    ]
  },
  subscriptions: {
    results: [
      {
        id: "SUB-001",
        type: "premium",
        customer: { name: "John Doe", email: "john@example.com" },
        amount: 29.99,
        currency: "USD",
        date: "2024-06-01T10:30:00Z",
        status: "completed"
      },
      {
        id: "SUB-002",
        type: "basic",
        customer: { name: "Sarah Wilson", email: "sarah@example.com" },
        amount: 9.99,
        currency: "USD",
        date: "2024-05-28T14:20:00Z",
        status: "completed"
      },
      {
        id: "SUB-003",
        type: "premium",
        customer: { name: "Mike Johnson", email: "mike@example.com" },
        amount: 29.99,
        currency: "USD",
        date: "2024-05-25T09:15:00Z",
        status: "pending"
      },
      {
        id: "SUB-004",
        type: "basic",
        customer: { name: "Emma Davis", email: "emma@example.com" },
        amount: 9.99,
        currency: "USD",
        date: "2024-05-22T16:45:00Z",
        status: "completed"
      },
      {
        id: "SUB-005",
        type: "premium",
        customer: { name: "Alex Brown", email: "alex@example.com" },
        amount: 29.99,
        currency: "USD",
        date: "2024-05-20T11:30:00Z",
        status: "completed"
      }
    ],
    totalPages: 3
  }
};

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/revenue/overview");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for revenue overview - external API unavailable");
    return NextResponse.json(mockRevenueData);
  }
}
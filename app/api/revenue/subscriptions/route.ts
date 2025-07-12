import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Updated mock data to match frontend expectations
const mockSubscriptionsData = {
  totalUsers: 12450,
  totalRevenue: 456780,
  growth: "+12.5%",
  tiers: [
    {
      name: "Basic",
      users: 4560,
      revenue: 45600,
      growth: "+8.7%",
      currency: "USD"
    },
    {
      name: "Premium",
      users: 3240,
      revenue: 97200,
      growth: "+15.3%",
      currency: "USD"
    },
    {
      name: "Enterprise",
      users: 890,
      revenue: 267000,
      growth: "+22.1%",
      currency: "USD"
    },
    {
      name: "Student",
      users: 3760,
      revenue: 37600,
      growth: "+5.4%",
      currency: "USD"
    }
  ],
  subscriptions: [
    {
      id: 1,
      user: "John Doe",
      plan: "Premium",
      amount: 29.99,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      autoRenew: true
    },
    {
      id: 2,
      user: "Sarah Wilson",
      plan: "Basic",
      amount: 9.99,
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      autoRenew: true
    },
    {
      id: 3,
      user: "Mike Johnson",
      plan: "Premium",
      amount: 29.99,
      status: "cancelled",
      startDate: "2024-01-05",
      endDate: "2024-02-05",
      autoRenew: false
    },
    {
      id: 4,
      user: "Emma Davis",
      plan: "Basic",
      amount: 9.99,
      status: "active",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      autoRenew: true
    },
    {
      id: 5,
      user: "Alex Brown",
      plan: "Premium",
      amount: 29.99,
      status: "active",
      startDate: "2024-01-12",
      endDate: "2024-02-12",
      autoRenew: true
    }
  ],
  totalSubscriptions: 1245,
  activeSubscriptions: 892,
  cancelledSubscriptions: 353,
  monthlyRecurringRevenue: 234500,
  subscriptionGrowth: 8.7
};

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/revenue/subscriptions");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for revenue subscriptions - external API unavailable");
    return NextResponse.json(mockSubscriptionsData);
  }
}
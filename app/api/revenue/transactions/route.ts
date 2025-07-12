import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Mock data for when external API is unavailable
const mockTransactionsData = {
  transactions: [
    {
      id: "TXN-001",
      user: "John Doe",
      type: "subscription",
      amount: 29.99,
      status: "completed",
      date: "2024-01-15T10:30:00Z",
      description: "Premium Subscription"
    },
    {
      id: "TXN-002",
      user: "Sarah Wilson",
      type: "one_time",
      amount: 15.99,
      status: "completed",
      date: "2024-01-14T14:20:00Z",
      description: "Quiz Pack - Advanced Math"
    },
    {
      id: "TXN-003",
      user: "Mike Johnson",
      type: "subscription",
      amount: 9.99,
      status: "completed",
      date: "2024-01-13T09:15:00Z",
      description: "Basic Subscription"
    },
    {
      id: "TXN-004",
      user: "Emma Davis",
      type: "one_time",
      amount: 24.99,
      status: "completed",
      date: "2024-01-12T16:45:00Z",
      description: "Study Materials Bundle"
    },
    {
      id: "TXN-005",
      user: "Alex Brown",
      type: "subscription",
      amount: 29.99,
      status: "pending",
      date: "2024-01-11T11:30:00Z",
      description: "Premium Subscription"
    }
  ],
  totalTransactions: 1245,
  completedTransactions: 1189,
  pendingTransactions: 56,
  totalRevenue: 456780,
  averageTransactionValue: 367.29
};

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/revenue/transactions");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for revenue transactions - external API unavailable");
    return NextResponse.json(mockTransactionsData);
  }
}
import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

// Updated mock data to match frontend expectations
const mockUsersData = {
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-06-01T10:30:00Z",
      subscription: "Premium",
      subjects: ["Mathematics", "Physics"],
      quizzesTaken: 45,
      avgScore: 85.2
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-20",
      lastLogin: "2024-06-01T14:20:00Z",
      subscription: "Basic",
      subjects: ["Chemistry", "Biology"],
      quizzesTaken: 32,
      avgScore: 78.5
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "student",
      status: "inactive",
      joinDate: "2024-02-05",
      lastLogin: "2024-05-25T09:15:00Z",
      subscription: "Premium",
      subjects: ["Computer Science"],
      quizzesTaken: 28,
      avgScore: 92.1
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-02-10",
      lastLogin: "2024-06-01T16:45:00Z",
      subscription: "Basic",
      subjects: ["Mathematics", "Chemistry"],
      quizzesTaken: 38,
      avgScore: 81.7
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-02-15",
      lastLogin: "2024-06-01T11:30:00Z",
      subscription: "Premium",
      subjects: ["Physics", "Computer Science"],
      quizzesTaken: 52,
      avgScore: 88.9
    },
    {
      id: 6,
      name: "Dr. Maria Garcia",
      email: "maria@example.com",
      role: "teacher",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-06-01T08:15:00Z",
      subscription: "Enterprise",
      subjects: ["Mathematics"],
      classrooms: 4,
      resources: 95
    },
    {
      id: 7,
      name: "Prof. David Chen",
      email: "david@example.com",
      role: "teacher",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-06-01T12:30:00Z",
      subscription: "Enterprise",
      subjects: ["Physics"],
      classrooms: 3,
      resources: 87
    },
    {
      id: 8,
      name: "Dr. Lisa Thompson",
      email: "lisa@example.com",
      role: "teacher",
      status: "active",
      joinDate: "2024-01-20",
      lastLogin: "2024-06-01T15:45:00Z",
      subscription: "Enterprise",
      subjects: ["Chemistry"],
      classrooms: 5,
      resources: 92
    }
  ],
  total: 12450,
  activeUsers: 8920,
  inactiveUsers: 3530,
  totalPages: 10,
  currentPage: 1
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const { data } = await apiClient.get("/api/users", { params });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for users list - external API unavailable");
    return NextResponse.json(mockUsersData);
  }
}

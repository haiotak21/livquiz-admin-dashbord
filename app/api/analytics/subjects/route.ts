import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

// Mock data for when external API is unavailable
const mockSubjectsData = {
  subjects: [
    {
      id: 1,
      name: "Mathematics",
      students: 2340,
      quizzes: 156,
      averageScore: 78.5,
      growth: 12.3,
      topics: ["Algebra", "Calculus", "Geometry", "Statistics"]
    },
    {
      id: 2,
      name: "Physics",
      students: 1890,
      quizzes: 124,
      averageScore: 72.8,
      growth: 8.7,
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"]
    },
    {
      id: 3,
      name: "Chemistry",
      students: 1560,
      quizzes: 98,
      averageScore: 75.2,
      growth: 15.4,
      topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"]
    },
    {
      id: 4,
      name: "Biology",
      students: 1340,
      quizzes: 87,
      averageScore: 81.3,
      growth: 6.9,
      topics: ["Cell Biology", "Genetics", "Ecology", "Evolution"]
    },
    {
      id: 5,
      name: "Computer Science",
      students: 980,
      quizzes: 65,
      averageScore: 85.7,
      growth: 22.1,
      topics: ["Programming", "Data Structures", "Algorithms", "Web Development"]
    }
  ],
  totalSubjects: 5,
  averageStudentsPerSubject: 1622,
  totalQuizzes: 530
};

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/analytics/subjects");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for analytics subjects - external API unavailable");
    return NextResponse.json(mockSubjectsData);
  }
}
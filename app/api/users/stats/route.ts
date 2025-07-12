import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// Updated mock data to match frontend expectations
const mockUserStatsData = {
  students: {
    metrics: [
      { id: "total_students", title: "Total Students", value: 11200, change: "+12.5%" },
      { id: "active_students", title: "Active Students", value: 8920, change: "+8.7%" },
      { id: "new_students", title: "New Students", value: 1240, change: "+15.3%" },
      { id: "avg_score", title: "Average Score", value: 78.5, change: "+2.1%" }
    ],
    progressOverTime: [
      { month: "Jan", quizScore: 72, flashcards: 65 },
      { month: "Feb", quizScore: 75, flashcards: 68 },
      { month: "Mar", quizScore: 78, flashcards: 72 },
      { month: "Apr", quizScore: 80, flashcards: 75 },
      { month: "May", quizScore: 82, flashcards: 78 },
      { month: "Jun", quizScore: 85, flashcards: 82 }
    ],
    weeklyActivity: [
      { id: 1, metric: "Quizzes Completed", value: 15680, trend: "up" },
      { id: 2, metric: "Study Sessions", value: 23450, trend: "up" },
      { id: 3, metric: "Flashcard Reviews", value: 45620, trend: "up" },
      { id: 4, metric: "Time Spent (hrs)", value: 8920, trend: "down" }
    ],
    subjectPerformance: [
      { subject: "Mathematics", score: 85 },
      { subject: "Physics", score: 78 },
      { subject: "Chemistry", score: 82 },
      { subject: "Biology", score: 79 },
      { subject: "Computer Science", score: 88 }
    ]
  },
  teachers: {
    metrics: [
      { id: "total_teachers", title: "Total Teachers", value: 850, change: "+5.2%" },
      { id: "active_teachers", title: "Active Teachers", value: 720, change: "+3.8%" },
      { id: "content_created", title: "Content Created", value: 2340, change: "+12.1%" },
      { id: "avg_rating", title: "Average Rating", value: 4.6, change: "+0.3%" }
    ],
    activityTrends: [
      { month: "Jan", activeTeachers: 650, contentCreated: 180 },
      { month: "Feb", activeTeachers: 680, contentCreated: 220 },
      { month: "Mar", activeTeachers: 700, contentCreated: 250 },
      { month: "Apr", activeTeachers: 720, contentCreated: 280 },
      { month: "May", activeTeachers: 750, contentCreated: 320 },
      { month: "Jun", activeTeachers: 780, contentCreated: 350 }
    ]
  },
  totalUsers: 12450,
  activeUsers: 8920,
  newUsersThisMonth: 1240,
  usersGrowth: 12.5,
  userEngagement: {
    dailyActive: 3240,
    weeklyActive: 8920,
    monthlyActive: 12450,
    averageSessionTime: 28.5
  },
  userDistribution: {
    byRole: {
      students: 11200,
      teachers: 850,
      admins: 400
    },
    byStatus: {
      active: 8920,
      inactive: 3530
    },
    bySubscription: {
      premium: 4560,
      basic: 4560,
      free: 3330
    }
  },
  topSubjects: [
    { subject: "Mathematics", users: 2340, growth: 8.2 },
    { subject: "Physics", users: 1890, growth: 15.7 },
    { subject: "Chemistry", users: 1560, growth: 6.8 },
    { subject: "Biology", users: 1340, growth: 12.3 },
    { subject: "Computer Science", users: 980, growth: 22.1 }
  ]
};

export async function GET() {
  try {
    const { data } = await apiClient.get('/api/users/stats');
    return NextResponse.json(data);
  } catch (error) {
    console.log("Using mock data for users stats - external API unavailable");
    return NextResponse.json(mockUserStatsData);
  }
}
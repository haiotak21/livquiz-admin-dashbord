"use client";

import { useState, useEffect } from "react";
import { useCallback } from "react";
import {
  Card,
  Title,
  LineChart,
  BarChart,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import {
  Users,
  UserPlus,
  UserCog,
  Award,
  Clock,
  BookOpen,
  GraduationCap,
  FileText,
} from "lucide-react";
import { useUserStats, useUsersList } from "@/hooks/useUsers";
import { DataLoader } from "@/components/DataLoader";
import { format } from "date-fns";
import { UserMetric, UserRole } from "@/types/users";

const metricIcons = {
  // Student metrics
  total_students: Users,
  active_students: Users,
  new_students: UserPlus,
  avg_score: Award,
  // Teacher metrics
  total_teachers: UserCog,
  active_teachers: UserCog,
  content_created: FileText,
  avg_rating: Award,
  // Fallback for any unmatched metrics
  default: Users,
};

export default function UserManagement() {
  // Monthly & Daily Active Users integration
  const [monthlyActive, setMonthlyActive] = useState<{
    count: number;
    users: any[];
  } | null>(null);
  const [dailyActive, setDailyActive] = useState<{
    count: number;
    users: any[];
  } | null>(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const [activeError, setActiveError] = useState<string | null>(null);

  const fetchActiveUsers = useCallback(async () => {
    setLoadingActive(true);
    setActiveError(null);
    try {
      const [monthlyRes, dailyRes] = await Promise.all([
        fetch("/api/users/monthly-active"),
        fetch("/api/users/daily-active"),
      ]);
      if (!monthlyRes.ok)
        throw new Error("Failed to fetch monthly active users");
      if (!dailyRes.ok) throw new Error("Failed to fetch daily active users");
      const monthlyJson = await monthlyRes.json();
      const dailyJson = await dailyRes.json();
      setMonthlyActive(monthlyJson.data ?? { count: 0, users: [] });
      setDailyActive(dailyJson.data ?? { count: 0, users: [] });
    } catch (err: any) {
      setActiveError(err.message || "Error");
    } finally {
      setLoadingActive(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useUserStats();
  const role = activeTab === 0 ? "student" : "teacher";
  const { data: usersData, isLoading: usersLoading } = useUsersList(
    role,
    page,
    debouncedSearch
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const renderMetrics = (metrics: UserMetric[] = []) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {metrics?.map((metric) => {
        const Icon =
          metricIcons[metric.id as keyof typeof metricIcons] ||
          metricIcons.default;
        return (
          <div
            key={metric.id}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{metric.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900">
                  {typeof metric.value === "number"
                    ? metric.value.toLocaleString()
                    : metric.value}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <Icon className="h-6 w-6 text-[#7928CA]" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  metric.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {" "}
                {metric.change}{" "}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderUserTable = () => (
    <Card className="bg-white border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-6">
        <Title className="text-gray-900">
          {role.charAt(0).toUpperCase() + role.slice(1)} List
        </Title>
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${role}s...`}
            className="bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA] focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b border-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Status</th>
              {role === "student" ? (
                <>
                  <th className="text-left py-3 px-4">Quizzes Taken</th>
                  <th className="text-left py-3 px-4">Avg. Score</th>
                </>
              ) : (
                <>
                  <th className="text-left py-3 px-4">Classrooms</th>
                  <th className="text-left py-3 px-4">Resources</th>
                </>
              )}
              <th className="text-left py-3 px-4">Last Login</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.data.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 text-gray-700"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                {role === "student" ? (
                  <>
                    <td className="py-3 px-4">{user.quizzesTaken || 0}</td>
                    <td className="py-3 px-4">{user.avgScore || "N/A"}</td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{user.classrooms || 0}</td>
                    <td className="py-3 px-4">
                      {user.resources ? `${user.resources}%` : "N/A"}
                    </td>
                  </>
                )}
                <td className="py-3 px-4">
                  {format(new Date(user.lastLogin), "MM/dd/yyyy")}
                </td>
                <td className="py-3 px-4">
                  <button className="text-[#7928CA] hover:text-[#FF0080] transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mt-4">
        <span className="text-gray-600">
          Showing {(page - 1) * 10 + 1} -{" "}
          {Math.min(page * 10, usersData?.total || 0)} of{" "}
          {usersData?.total || 0}
        </span>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 sm:py-1 border rounded-md disabled:opacity-50 w-full sm:w-auto"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * 10 >= (usersData?.total || 0)}
            className="px-3 py-2 sm:py-1 border rounded-md disabled:opacity-50 w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );

  return (
    <DataLoader
      isLoading={statsLoading || usersLoading || loadingActive}
      error={
        statsError ? statsError : activeError ? new Error(activeError) : null
      }
      skeleton="users"
    >
      <div className="space-y-6 bg-gray-50 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button className="bg-[#6052cc] hover:bg-[#4A3C8C] text-white transition-colors px-4 py-2 rounded-lg flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>

        {/* Active Users Cards - Redesigned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Active Users Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  Daily Active Users
                </p>
                <p className="text-3xl font-bold mt-1 text-[#0E7490]">
                  {dailyActive?.count ?? "--"}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white shadow">
                <Clock className="h-7 w-7 text-[#0E7490]" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-600 text-sm font-semibold">
                Recent:
              </span>
              <ul className="mt-2 space-y-1">
                {(dailyActive?.users?.length ?? 0) > 0 ? (
                  dailyActive?.users?.slice(0, 5).map((user: any) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#B5FFFC] flex items-center justify-center text-xs font-bold text-gray-700">
                          {user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">
                          {user.email}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 ml-2">
                        {user.lastLoginAt
                          ? format(new Date(user.lastLoginAt), "MM/dd/yyyy")
                          : ""}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No data</li>
                )}
              </ul>
            </div>
          </div>
          {/* Monthly Active Users Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  Monthly Active Users
                </p>
                <p className="text-3xl font-bold mt-1 text-[#7928CA]">
                  {monthlyActive?.count ?? "--"}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white shadow">
                <Users className="h-7 w-7 text-[#7928CA]" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-600 text-sm font-semibold">
                Recent:
              </span>
              <ul className="mt-2 space-y-1">
                {(monthlyActive?.users?.length ?? 0) > 0 ? (
                  monthlyActive?.users?.slice(0, 5).map((user: any) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#D9AFD9] flex items-center justify-center text-xs font-bold text-gray-700">
                          {user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">
                          {user.email}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 ml-2">
                        {user.lastLoginAt
                          ? format(new Date(user.lastLoginAt), "MM/dd/yyyy")
                          : ""}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No data</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="bg-white border border-gray-200 rounded-lg p-1">
            <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">
              Students
            </Tab>
            <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">
              Teachers
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {renderMetrics(stats?.students.metrics || [])}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-white border border-gray-200">
                  <Title className="text-gray-900 mb-4">
                    Progress Over Time
                  </Title>
                  <LineChart
                    data={stats?.students.progressOverTime || []}
                    index="month"
                    categories={["quizScore", "flashcards"]}
                    colors={["#00A8FF", "#7928CA"]}
                    valueFormatter={(value) => `${value}%`}
                    className="h-72"
                  />
                </Card>

                <Card className="bg-white border border-gray-200">
                  <Title className="text-gray-900 mb-4">
                    Weekly Activity Trends
                  </Title>
                  <div className="space-y-6">
                    {stats?.students.weeklyActivity.map((activity) => (
                      <div key={activity.id} className="space-y-2">
                        <p className="text-gray-900">{activity.metric}</p>
                        <div className="flex items-center">
                          {activity.trend === "up" ? (
                            <span className="text-green-600 text-3xl">↑</span>
                          ) : (
                            <span className="text-red-600 text-3xl">↓</span>
                          )}
                          <span
                            className={`text-3xl font-bold ml-2 ${
                              activity.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {activity.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="bg-white border border-gray-200 mt-6">
                <Title className="text-gray-900 mb-4">
                  Subject Performance
                </Title>
                <BarChart
                  data={stats?.students.subjectPerformance || []}
                  index="subject"
                  categories={["score"]}
                  colors={["#FF0080"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-72"
                />
              </Card>

              {renderUserTable()}
            </TabPanel>

            <TabPanel>
              {renderMetrics(stats?.teachers?.metrics || [])}

              <Card className="bg-white border border-gray-200 mt-6">
                <Title className="text-gray-900 mb-4">
                  Teacher Activity Trends
                </Title>
                <LineChart
                  data={stats?.teachers.activityTrends || []}
                  index="month"
                  categories={["activeTeachers", "contentCreated"]}
                  colors={["#00A8FF", "#7928CA"]}
                  className="h-72"
                />
              </Card>

              {renderUserTable()}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </DataLoader>
  );
}

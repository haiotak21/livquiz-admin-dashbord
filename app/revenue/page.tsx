"use client";
import { useState } from 'react';
import { useRevenue } from '@/hooks/useRevenue';
import { RevenueOverviewResponse } from '@/types/revenue';
import { Card, Title, BarChart, Button, Text } from '@tremor/react';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { DataLoader } from '@/components/DataLoader';

const STAT_ICONS = {
  total_revenue: DollarSign,
  active_subscriptions: Users,
  avg_transaction: CreditCard,
  one_time_purchases: ShoppingCart
};

const formatCurrency = (value: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export default function RevenueDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    isFetching,
    error
  } = useRevenue(currentPage);

  const handlePreviousPage = () => setCurrentPage(old => Math.max(old - 1, 1));
  const handleNextPage = () => {
    if (!data?.subscriptions.totalPages) return;
    setCurrentPage(old => (old >= data.subscriptions.totalPages ? old : old + 1));
  };

  return (
    <DataLoader isLoading={isLoading || isFetching} error={error} skeleton="revenue">
      <div className="space-y-6 bg-gray-50 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Revenue Dashboard</h1>
            {/* <div className="flex items-center gap-2">
              <Text className="text-lg font-semibold">
                {formatCurrency(data?.metrics.total || 0, 'USD')}
              </Text>
              <span className="text-[#6052cc] text-sm bg-[#6052cc]/20 px-2 py-1 rounded">
                {data?.metrics.growth}
              </span>
            </div> */}
          </div>
          <Button
            icon={TrendingUp}
            className="bg-[#6052cc] hover:bg-[#4A3C8C] text-white transition-colors"
          >
            Export Report
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.metrics.stats.map((stat) => {
            const Icon = STAT_ICONS[stat.id as keyof typeof STAT_ICONS];
            const isPositive = stat.trend === 'up';

            return (
              <Card key={stat.id} className="p-4 bg-white shadow-lg rounded-lg border-0 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-sm text-gray-600">{stat.title}</Text>
                    <Text className="text-2xl font-semibold mt-1">
                      {stat.currency ?
                        formatCurrency(stat.value, stat.currency) :
                        stat.value.toLocaleString()
                      }
                    </Text>
                  </div>
                  {Icon && (
                    <div className={`p-3 rounded-lg ${isPositive ? 'bg-[#6052cc]/20' : 'bg-[#4A3C8C]/20'}`}>
                      <Icon className={`h-6 w-6 ${isPositive ? 'text-[#4A3C8C]' : 'text-[#4A3C8C]'}`} />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center">
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-700 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-700 mr-1" />
                  )}
                  <Text className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                    {stat.change}
                  </Text>
                  <Text className="text-sm text-gray-500 ml-2">{stat.timeframe}</Text>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Revenue Trends Chart */}
        <Card className="p-6 shadow-sm mt-10">
          <div className="mb-6">
            <Title className="text-gray-900">Revenue Trends</Title>
            {/* <div className="mt-2 flex items-center gap-4">
              <Text className="text-2xl font-bold">
                {formatCurrency(data?.trends.total || 0, 'USD')}
              </Text>
              <span className="text-[#6052cc] text-sm bg-[#6052cc]/20 px-2 py-1 rounded">
                {data?.trends.growth}
              </span>
            </div> */}
          </div>
          <BarChart
            data={data?.trends.breakdown || []}
            index="date"
            categories={['subscriptions', 'one_time', 'premium_content']}
            colors={['#6052cc', '#7D6CDE', '#36B37E']}
            valueFormatter={(value) => formatCurrency(value, 'USD')}
            showAnimation={true}
            className="h-72"
          />
        </Card>

        {/* Transactions Table */}
        <Card className="p-6 shadow-sm mt-5">
          <div className="mb-6">
            <Title className="text-gray-900">Recent Subscription</Title>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-600 border-b border-gray-200">
                  <th className="text-left py-3 px-4">Subscription ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className={isLoading ? 'opacity-50' : ''}>
                {data?.subscriptions.results.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">
                      {transaction.id}
                    </td>
                    <td className="py-3 px-4 capitalize">{transaction.type}</td>
                    <td className="py-3 px-4">
                      <div>
                        <Text className="font-medium">{transaction.customer.name}</Text>
                        <Text className="text-sm text-gray-500">{transaction.customer.email}</Text>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'completed'
                        ? 'bg-green-200 text-green-700'
                        : 'bg-[#4A3C8C]/20 text-[#4A3C8C]'
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls - Moved to Bottom */}
            <div className="mt-6 flex items-center justify-end gap-4">
              <Button
                size="md"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoading}
                icon={ChevronLeft}
                variant="light"
                className="text-[#6052cc] hover:bg-[#6052cc]/10"
              >
                Previous
              </Button>

              <Text className="text-md text-gray-600">
                Page {currentPage} of {data?.subscriptions.totalPages || 1}
              </Text>

              <Button
                size="md"
                onClick={handleNextPage}
                disabled={currentPage >= (data?.subscriptions.totalPages || 1) || isLoading}
                icon={ChevronRight}
                iconPosition="right"
                variant="light"
                className="text-[#6052cc] hover:bg-[#6052cc]/10"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DataLoader>
  );
}
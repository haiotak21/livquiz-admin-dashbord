'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

// Skeleton components for different content types
const MetricSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="p-3 rounded-lg bg-gray-100">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
    <div className="h-72 bg-gray-100 rounded"></div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 bg-gray-200 rounded w-32"></div>
      <div className="h-10 bg-gray-200 rounded w-48"></div>
    </div>
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 rounded"></div>
      ))}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="space-y-6 bg-gray-50 p-6">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>

    {/* Metrics Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <MetricSkeleton key={i} />
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    {/* Table Skeleton */}
    <TableSkeleton />
  </div>
);

const UsersSkeleton = () => (
  <div className="space-y-6 bg-gray-50 p-6">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div className="h-8 bg-gray-200 rounded w-40"></div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>

    {/* Tabs Skeleton */}
    <div className="bg-white border border-gray-200 rounded-lg p-1">
      <div className="flex space-x-1">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>

    {/* Metrics Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <MetricSkeleton key={i} />
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    {/* Table Skeleton */}
    <TableSkeleton />
  </div>
);

const RevenueSkeleton = () => (
  <div className="space-y-6 bg-gray-50 p-6">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>

    {/* Metrics Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <MetricSkeleton key={i} />
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    {/* Table Skeleton */}
    <TableSkeleton />
  </div>
);

// Professional loading spinner
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-[#6052cc]`}></div>
    </div>
  );
};

// Error component with retry functionality
const ErrorDisplay = ({ error, onRetry }: { error: Error; onRetry?: () => void }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-sm text-gray-500 mb-6">{error.message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6052cc] hover:bg-[#4A3C8C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6052cc] transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  </div>
);

const ReloadSpinner = () => (
  <div className="absolute top-4 right-4 z-50">
    <div className="flex items-center space-x-2 bg-white/80 px-3 py-1 rounded shadow">
      <RefreshCw className="animate-spin text-[#6052cc] w-5 h-5" />
      <span className="text-xs text-[#6052cc] font-medium">Refreshing...</span>
    </div>
  </div>
);

export const DataLoader = ({
  isLoading,
  isRefetching = false,
  error,
  children,
  skeleton = 'dashboard',
  onRetry,
}: {
  isLoading: boolean;
  isRefetching?: boolean;
  error: Error | null;
  children: ReactNode;
  skeleton?: 'dashboard' | 'users' | 'revenue';
  onRetry?: () => void;
}) => {
  // Show error toast
  if (error) {
    toast.error(error.message, {
      duration: 5000,
      icon: '❌',
      style: {
        background: '#FEE2E2',
        color: '#991B1B',
        border: '1px solid #FCA5A5',
      },
    });
  }

  // Show success toast only once per page load
  const hasShownSuccess = useRef(false);
  useEffect(() => {
    if (!isLoading && !error && !hasShownSuccess.current) {
      toast.success('Data loaded successfully', {
        duration: 2000,
        icon: '✅',
        style: {
          background: '#DCFCE7',
          color: '#166534',
          border: '1px solid #86EFAC',
        },
      });
      hasShownSuccess.current = true;
    }
  }, [isLoading, error]);

  // Render error state
  if (error) {
    return <ErrorDisplay error={error} onRetry={onRetry} />;
  }

  // Render skeleton loader for both initial load and refetch
  if (isLoading || isRefetching) {
    const SkeletonComponent = {
      dashboard: DashboardSkeleton,
      users: UsersSkeleton,
      revenue: RevenueSkeleton,
    }[skeleton];

    return (
      <>
        <SkeletonComponent />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </>
    );
  }

  // Render children
  return (
    <div className="relative">
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

// Export the loading spinner for use in other components
export { LoadingSpinner };
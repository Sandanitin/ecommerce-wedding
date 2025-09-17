import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import adminApi from '../services/api';
import BottomNav from '../components/BottomNav';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const toastShownRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenueChange: 0,
    lastMonthRevenue: 0,
    averageOrderValue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState({
    labels: ['Delivered', 'Processing', 'Pending', 'Cancelled'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 1,
    }],
  });

  // Daily revenue chart state
  const [dailyRevenueData, setDailyRevenueData] = useState({
    labels: [],
    datasets: [{
      label: 'Daily Revenue',
      data: [],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.4)',
      tension: 0.3,
    }],
  });

  

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await fetchDashboardData();
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        if (!toastShownRef.current) {
          toast.error('Failed to load dashboard data');
          toastShownRef.current = true;
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // Set up polling every 30 seconds
    const interval = setInterval(loadData, 30000);

    return () => {
      clearInterval(interval);
      toastShownRef.current = false;
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminApi.dashboard.getOverview();
      const data = response.data?.data || {};

      const s = data.stats || {};
      setStats({
        totalOrders: s.totalOrders || 0,
        totalRevenue: s.totalRevenue || 0,
        totalProducts: s.totalProducts || 0,
        totalCustomers: s.totalCustomers || 0,
        pendingOrders: s.pendingOrders || 0,
        completedOrders: s.completedOrders || 0,
        revenueChange: s.revenueChange || 0,
        lastMonthRevenue: s.lastMonthRevenue || 0,
        averageOrderValue: s.averageOrderValue || 0,
      });

      // Daily revenue trend for current month (replace monthly chart)
      const now = new Date();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dayLabels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1));
      const revenueByDay = data.revenueByDay || {};
      const dayValues = dayLabels.map((d) => Number(revenueByDay[d] || 0));
      setDailyRevenueData(prev => ({
        ...prev,
        labels: dayLabels,
        datasets: [{
          ...prev.datasets[0],
          data: dayValues,
        }],
      }));

      setTopProducts(data.topProducts || []);

      // Wire Order Status Distribution pie data
      const dist = data.statusDistribution || {};
      const pieCounts = [
        dist.delivered || 0,
        dist.processing || 0,
        dist.pending || 0,
        dist.cancelled || 0,
      ];
      setOrderStatusData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: pieCounts,
          },
        ],
      }));

      const recent = (Array.isArray(data.recentOrders) ? data.recentOrders : []).map(o => ({
        ...o,
        date: new Date(o.date).toLocaleDateString()
      }));
      setRecentOrders(recent);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      throw error;
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      await fetchDashboardData();
      toast.success('Dashboard data refreshed');
    } catch (error) {
      console.error('Failed to refresh dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen pb-20 md:pb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleRefresh}
          //className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 w-full md:w-auto"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 w-full md:w-auto"
        >
          Refresh Data
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          <p className="text-xs md:text-sm text-green-600 mt-1 md:mt-2">
            {stats.completedOrders} completed
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center mt-1 md:mt-2">
            <span className={`text-xs md:text-sm ${
              stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.revenueChange >= 0 ? '↑' : '↓'} {Math.abs(stats.revenueChange).toFixed(1)}%
            </span>
            <span className="text-xs md:text-sm text-gray-500 ml-2">
              vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Revenue Trend (Daily - Current Month)</h2>
          <div className="h-64 md:h-80">
            <Line
              data={dailyRevenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Order Status Distribution</h2>
          <div className="h-64 md:h-80">
            <Pie
              data={orderStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity Sold
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order.id.slice(-6)}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard; 
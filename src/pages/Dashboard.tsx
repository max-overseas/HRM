import React from 'react';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  UserPlus,
  CalendarDays,
  Building
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Employees',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Present Today',
      value: '231',
      change: '93.5%',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      name: 'Monthly Payroll',
      value: '$1.2M',
      change: '+5.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Pending Leaves',
      value: '18',
      change: '-23%',
      changeType: 'negative',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new_employee',
      message: 'Sarah Wilson joined Engineering team',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-green-600 bg-green-100 dark:bg-green-500/20'
    },
    {
      id: 2,
      type: 'leave_request',
      message: 'John Doe requested 3 days leave',
      time: '4 hours ago',
      icon: CalendarDays,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/20'
    },
    {
      id: 3,
      type: 'department_update',
      message: 'Marketing team completed Q4 review',
      time: '6 hours ago',
      icon: Building,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/20'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Building Event',
      date: 'Dec 15, 2024',
      time: '10:00 AM',
      type: 'Company Event'
    },
    {
      id: 2,
      title: 'Performance Reviews',
      date: 'Dec 20, 2024',
      time: '9:00 AM',
      type: 'HR Process'
    },
    {
      id: 3,
      title: 'Holiday Party',
      date: 'Dec 22, 2024',
      time: '6:00 PM',
      type: 'Celebration'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name}!
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening in your organization today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">{activity.message}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              View Calendar
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{event.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
            <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-700 dark:text-blue-300">Add New Employee</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-300">Approve Leaves</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors">
            <AlertTriangle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-purple-700 dark:text-purple-300">Review Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
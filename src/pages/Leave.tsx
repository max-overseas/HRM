import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'vacation' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

const Leave: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Sarah Johnson',
      department: 'Human Resources',
      leaveType: 'vacation',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      days: 5,
      reason: 'Family vacation to Hawaii',
      status: 'pending',
      appliedDate: '2024-01-10'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'John Smith',
      department: 'Engineering',
      leaveType: 'sick',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      days: 3,
      reason: 'Flu symptoms and recovery',
      status: 'approved',
      appliedDate: '2024-01-14'
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      leaveType: 'personal',
      startDate: '2024-01-22',
      endDate: '2024-01-22',
      days: 1,
      reason: 'Personal appointment',
      status: 'approved',
      appliedDate: '2024-01-12'
    },
    {
      id: '4',
      employeeId: '4',
      employeeName: 'Michael Brown',
      department: 'Finance',
      leaveType: 'emergency',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      days: 2,
      reason: 'Family emergency',
      status: 'rejected',
      appliedDate: '2024-01-17'
    }
  ];

  const statusOptions = ['all', 'pending', 'approved', 'rejected'];

  const filteredRequests = leaveRequests.filter(request => 
    selectedStatus === 'all' || request.status === selectedStatus
  );

  const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'rejected':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getLeaveTypeColor = (type: LeaveRequest['leaveType']) => {
    switch (type) {
      case 'vacation':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400';
      case 'sick':
        return 'text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400';
      case 'personal':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-500/20 dark:text-purple-400';
      case 'maternity':
        return 'text-pink-600 bg-pink-100 dark:bg-pink-500/20 dark:text-pink-400';
      case 'emergency':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const leaveStats = {
    pending: leaveRequests.filter(r => r.status === 'pending').length,
    approved: leaveRequests.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.filter(r => r.status === 'rejected').length,
    total: leaveRequests.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Leave Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage employee leave requests and approvals</p>
        </div>
        
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveStats.pending}</p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveStats.approved}</p>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Approved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveStats.rejected}</p>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">Rejected</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveStats.total}</p>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Requests' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div key={request.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {request.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{request.employeeName}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{request.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                    <span className="capitalize">{request.leaveType}</span>
                  </span>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{request.status}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{request.days} day{request.days > 1 ? 's' : ''}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Applied Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatDate(request.appliedDate)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
                  <p className="font-medium text-gray-900 dark:text-white">{request.reason}</p>
                </div>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-500 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No leave requests found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedStatus === 'all' ? 'No leave requests have been submitted yet' : `No ${selectedStatus} requests found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Leave;
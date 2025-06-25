import React, { useState } from 'react';
import { Laptop, Smartphone, Monitor, Headphones, Plus, Search, Filter } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'laptop' | 'phone' | 'monitor' | 'headphones' | 'other';
  serialNumber: string;
  assignedTo?: string;
  assignedDate?: string;
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  purchaseDate: string;
  value: number;
}

const Assets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const assets: Asset[] = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      type: 'laptop',
      serialNumber: 'MBP-2023-001',
      assignedTo: 'John Smith',
      assignedDate: '2023-08-15',
      status: 'assigned',
      condition: 'excellent',
      purchaseDate: '2023-08-01',
      value: 2499
    },
    {
      id: '2',
      name: 'iPhone 14 Pro',
      type: 'phone',
      serialNumber: 'IP14-2023-002',
      assignedTo: 'Sarah Johnson',
      assignedDate: '2023-09-01',
      status: 'assigned',
      condition: 'good',
      purchaseDate: '2023-08-20',
      value: 999
    },
    {
      id: '3',
      name: 'Dell UltraSharp 27"',
      type: 'monitor',
      serialNumber: 'DU27-2023-003',
      status: 'available',
      condition: 'excellent',
      purchaseDate: '2023-07-15',
      value: 599
    },
    {
      id: '4',
      name: 'Sony WH-1000XM4',
      type: 'headphones',
      serialNumber: 'SWH-2023-004',
      assignedTo: 'Emily Davis',
      assignedDate: '2023-09-10',
      status: 'assigned',
      condition: 'good',
      purchaseDate: '2023-09-01',
      value: 349
    },
    {
      id: '5',
      name: 'MacBook Air M2',
      type: 'laptop',
      serialNumber: 'MBA-2023-005',
      status: 'maintenance',
      condition: 'fair',
      purchaseDate: '2023-06-01',
      value: 1199
    }
  ];

  const assetTypes = ['all', 'laptop', 'phone', 'monitor', 'headphones', 'other'];
  const statusOptions = ['all', 'available', 'assigned', 'maintenance', 'retired'];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'laptop':
        return Laptop;
      case 'phone':
        return Smartphone;
      case 'monitor':
        return Monitor;
      case 'headphones':
        return Headphones;
      default:
        return Laptop;
    }
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400';
      case 'assigned':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'retired':
        return 'text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  const getConditionColor = (condition: Asset['condition']) => {
    switch (condition) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const assetStats = {
    total: assets.length,
    available: assets.filter(a => a.status === 'available').length,
    assigned: assets.filter(a => a.status === 'assigned').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length,
    totalValue: assets.reduce((sum, asset) => sum + asset.value, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Asset Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Track and manage company assets and equipment</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105">
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Laptop className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assetStats.total}</p>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Assets</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assetStats.available}</p>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Available</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assetStats.assigned}</p>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Assigned</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assetStats.maintenance}</p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Maintenance</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(assetStats.totalValue)}</p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {assetTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const AssetIcon = getAssetIcon(asset.type);
          return (
            <div key={asset.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <AssetIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{asset.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{asset.serialNumber}</p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Condition</span>
                  <span className={`text-sm font-medium ${getConditionColor(asset.condition)}`}>
                    {asset.condition.charAt(0).toUpperCase() + asset.condition.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Value</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(asset.value)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Purchase Date</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDate(asset.purchaseDate)}
                  </span>
                </div>
                
                {asset.assignedTo && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Assigned To</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {asset.assignedTo}
                    </span>
                  </div>
                )}
                
                {asset.assignedDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Assigned Date</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(asset.assignedDate)}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button className="flex-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Edit
                </button>
                {asset.status === 'available' && (
                  <button className="flex-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    Assign
                  </button>
                )}
                {asset.status === 'assigned' && (
                  <button className="flex-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    Return
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Laptop className="w-8 h-8 text-gray-500 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assets found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Assets;
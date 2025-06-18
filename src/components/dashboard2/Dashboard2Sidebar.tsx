
interface Dashboard2SidebarProps {}

const Dashboard2Sidebar = ({}: Dashboard2SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">ledgr</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          <div className="px-3 py-2 bg-blue-100 text-blue-900 rounded-lg font-medium text-sm flex items-center space-x-3">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">📊</span>
            </div>
            <span>Dashboard</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            WORKSPACE
          </div>
          <div className="mt-2 space-y-1">
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>✓</span>
              <span>Checklists</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>📥</span>
              <span>Inbox</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>💳</span>
              <span>Transactions</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            EXPLORE
          </div>
          <div className="mt-2 space-y-1">
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>📊</span>
              <span>Accounting</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>💰</span>
              <span>Revenue</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>💸</span>
              <span>Expenses</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>👥</span>
              <span>Payroll</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>⬇️</span>
              <span>Downloads</span>
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
              <span>⚙️</span>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Account Analytics</span>
            <span className="text-sm text-gray-500">8/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Upgrade Plan <span className="ml-1">↗</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <span className="text-sm">Add to Chrome, Ext...</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2Sidebar;

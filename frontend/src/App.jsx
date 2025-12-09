import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterRow from './components/FilterRow';
import StatsCards from './components/StatsCards';
import SalesTable from './components/SalesTable';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';

function App() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-sans">
      <Sidebar />
      
      <main className="ml-60 flex-1 p-6 overflow-y-auto flex flex-col h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sales Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track all retail transactions</p>
          </div>
          <div className="w-96">
             <SearchBar />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="mb-4 shrink-0 bg-white p-3 rounded-xl border border-border shadow-sm">
           <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <FilterRow />
              </div>
           </div>
        </div>

        {/* Stats */}
        <div className="shrink-0">
            <StatsCards />
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0 overflow-hidden mb-2">
            <SalesTable />
        </div>
        
        {/* Pagination */}
        <div className="shrink-0">
            <Pagination />
        </div>
      </main>
    </div>
  );
}

export default App;

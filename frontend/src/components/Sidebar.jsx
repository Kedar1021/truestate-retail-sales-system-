import { FiGrid, FiLayers, FiInbox, FiBriefcase, FiFileText, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <aside className="w-60 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col z-30 font-sans">
            {/* Logo Section */}
            <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-50">
                <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white font-bold text-lg leading-none">T</span>
                </div>
                <h1 className="font-bold text-gray-900 text-xl tracking-tight">TruEstate</h1>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <NavItem icon={<FiGrid size={18} />} label="Dashboard" />
                <NavItem icon={<FiLayers size={18} />} label="Nexus" active />
                <NavItem icon={<FiInbox size={18} />} label="Intake" />
                <NavItem icon={<FiBriefcase size={18} />} label="Services" />
                <NavItem icon={<FiFileText size={18} />} label="Invoices" />
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-50">
                <NavItem icon={<FiSettings size={18} />} label="Settings" />
                
                <div className="mt-4 flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                        AU
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@truestate.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active }) => {
    return (
        <button
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
            ${active
                ? 'bg-[#D1FAE5] text-[#10B981]'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <span className={`shrink-0 ${active ? 'text-[#10B981]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {icon}
            </span>
            <span>{label}</span>
            {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            )}
        </button>
    );
};

export default Sidebar;

import React from 'react';
import { Package, Users } from 'lucide-react';

const Header = ({ activeView, setActiveView }) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">Mini Integration Platform</h1>
                    </div>

                    <nav className="flex space-x-1">
                        <button
                            onClick={() => setActiveView('customers')}
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${activeView === 'customers'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Users className="h-4 w-4 mr-1" />
                            CRM
                        </button>

                        <button
                            onClick={() => setActiveView('packages')}
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${activeView === 'packages'
                                    ? 'bg-teal-100 text-teal-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Package className="h-4 w-4 mr-1" />
                            Inventory
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

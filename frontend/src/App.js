import React, { useState } from 'react';
import { Package, Users } from 'lucide-react';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import PackageList from './components/PackageList';

function App() {
  const [activeView, setActiveView] = useState('customers');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} setActiveView={setActiveView} />

      <main className="container mx-auto px-4 py-8">
        {activeView === 'customers' ? (
          <div className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-semibold text-gray-800">Add New Customer</h1>
              </div>
              <CustomerForm />
            </div>

            <div>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-semibold text-gray-800">All Customers</h1>
              </div>
              <CustomerList />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-6">
              <Package className="h-6 w-6 text-teal-600 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-800">Welcome Packages</h1>
            </div>
            <PackageList />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

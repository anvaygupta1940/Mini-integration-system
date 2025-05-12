import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_CRM_BACKEND_URL}/api/customers/`);
        setCustomers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No customers yet</h3>
        <p className="mt-1 text-gray-500">
          Add your first customer using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {customers.map((customer) => (
        <div key={customer._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <a href={`mailto:${customer.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                  {customer.email}
                </a>
              </div>

              {customer.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>
              )}

              {customer.address && (
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                  <p className="text-sm text-gray-600">{customer.address}</p>
                </div>
              )}

              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-sm text-gray-500">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;

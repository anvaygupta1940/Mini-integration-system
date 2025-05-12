import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Calendar, MapPin } from 'lucide-react';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_INVENTORY_BACKEND_URL}/api/packages/`);
                setPackages(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load packages. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'preparing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading packages...</p>
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

    if (packages.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No packages yet</h3>
                <p className="mt-1 text-gray-500">
                    Welcome packages will appear here when new customers are added in the CRM system.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <div className="p-5">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">{pkg.packageType}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                            </span>
                        </div>

                        <p className="mt-2 text-gray-600 font-medium">For: {pkg.customerName}</p>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-start">
                                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                <p className="text-sm text-gray-500">{formatDate(pkg.createdAt)}</p>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                <p className="text-sm text-gray-500">{pkg.deliveryAddress}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Contents:</h4>
                            <ul className="pl-5 space-y-1">
                                {pkg.contents.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-600 list-disc">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageList;

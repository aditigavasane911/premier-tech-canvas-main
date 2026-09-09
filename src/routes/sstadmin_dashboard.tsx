import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Trash2, Search } from 'lucide-react';

export const Route = createFileRoute('/sstadmin_dashboard')({
  component: AdminDashboard,
});

interface CallbackRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enquiryFor: string;
  message: string;
  status?: string;
  submittedAt: string;
}

function AdminDashboard() {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate({ to: '/sstadmin' });
      return;
    }

    const fetchCallbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/callbacks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          localStorage.removeItem('adminToken');
          navigate({ to: '/sstadmin' });
          return;
        }

        const data = await res.json();
        if (res.ok) {
          setCallbacks(data);
        } else {
          setError(data.message || 'Failed to fetch callbacks');
        }
      } catch (err) {
        setError('Cannot connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchCallbacks();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this callback?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/callbacks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setCallbacks(callbacks.filter(cb => cb._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/callbacks/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setCallbacks(callbacks.map(cb => cb._id === id ? { ...cb, status: newStatus } : cb));
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const filteredCallbacks = callbacks.filter(cb => {
    const term = searchTerm.toLowerCase();
    return (
      cb.name.toLowerCase().includes(term) ||
      cb.email.toLowerCase().includes(term) ||
      cb.phone.toLowerCase().includes(term) ||
      cb.enquiryFor.toLowerCase().includes(term)
    );
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate({ to: '/sstadmin' });
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Callback Requests</h3>
              <p className="mt-1 text-sm text-gray-500">List of all callback inquiries from the website.</p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search callbacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry For</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCallbacks.map((cb) => (
                  <tr key={cb._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cb.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cb.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{cb.email}</div>
                      <div>{cb.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {cb.enquiryFor}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md whitespace-pre-wrap break-words" title={cb.message}>
                      {cb.message || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={cb.status || 'Pending'}
                        onChange={(e) => handleStatusChange(cb._id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                          cb.status === 'Approval' ? 'bg-green-100 text-green-800' :
                          cb.status === 'Resolved' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approval">Approval</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(cb._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCallbacks.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      No callback requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trash2, Search, Star } from "lucide-react";
import { API_BASE } from "@/lib/constants";

export const Route = createFileRoute("/sstadmin_dashboard")({
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

interface AdminFeedback {
  _id: string;
  name: string;
  role?: string;
  rating: number;
  quote: string;
  course?: string;
  status: string;
  submittedAt: string;
}

function AdminDashboard() {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [feedbacks, setFeedbacks] = useState<AdminFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "workshops" | "feedbacks">("courses");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [confirmingFeedbackId, setConfirmingFeedbackId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCallbacks = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/callbacks`, {
          credentials: "include", // Send cookie automatically
        });

        if (res.status === 401) {
          navigate({ to: "/sstadmin" });
          return;
        }

        const data = await res.json();
        if (res.ok) {
          setCallbacks(data);
        } else {
          setError(data.message || "Failed to fetch callbacks");
        }

        // Fetch feedbacks
        const fbRes = await fetch(`${API_BASE}/api/admin/feedbacks`, {
          credentials: "include",
        });
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          setFeedbacks(fbData);
        }
      } catch {
        setError("Cannot connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchCallbacks();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    // Inline two-step confirm — click once to arm ("Delete?"), again to confirm.
    if (confirmingId !== id) {
      setConfirmingId(id);
      setTimeout(() => setConfirmingId((cur) => (cur === id ? null : cur)), 3000);
      return;
    }
    setConfirmingId(null);

    try {
      const res = await fetch(`${API_BASE}/api/admin/callbacks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setCallbacks(callbacks.filter((cb) => cb._id !== id));
        setNotice("Callback request deleted.");
      } else {
        const data = await res.json();
        setNotice(data.message || "Failed to delete");
      }
    } catch {
      setNotice("Error connecting to server");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/callbacks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCallbacks(callbacks.map((cb) => (cb._id === id ? { ...cb, status: newStatus } : cb)));
        setNotice(`Status updated to ${newStatus}.`);
      } else {
        setNotice("Failed to update status");
      }
    } catch {
      setNotice("Error updating status");
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (confirmingFeedbackId !== id) {
      setConfirmingFeedbackId(id);
      setTimeout(() => setConfirmingFeedbackId((cur) => (cur === id ? null : cur)), 3000);
      return;
    }
    setConfirmingFeedbackId(null);

    try {
      const res = await fetch(`${API_BASE}/api/admin/feedbacks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
        setNotice("Feedback review deleted.");
      } else {
        const data = await res.json();
        setNotice(data.message || "Failed to delete feedback");
      }
    } catch {
      setNotice("Error connecting to server");
    }
  };

  const handleFeedbackStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/feedbacks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setFeedbacks(feedbacks.map((fb) => (fb._id === id ? { ...fb, status: newStatus } : fb)));
        setNotice(`Feedback status updated to ${newStatus}.`);
      } else {
        setNotice("Failed to update feedback status");
      }
    } catch {
      setNotice("Error updating feedback status");
    }
  };

  const filteredCallbacks = callbacks.filter((cb) => {
    const isWorkshop = cb.enquiryFor === "Workshop";
    if (activeTab === "workshops" && !isWorkshop) return false;
    if (activeTab === "courses" && isWorkshop) return false;

    const term = searchTerm.toLowerCase();
    return (
      cb.name.toLowerCase().includes(term) ||
      cb.email.toLowerCase().includes(term) ||
      cb.phone.toLowerCase().includes(term) ||
      cb.enquiryFor.toLowerCase().includes(term)
    );
  });

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const term = searchTerm.toLowerCase();
    return (
      fb.name.toLowerCase().includes(term) ||
      (fb.role && fb.role.toLowerCase().includes(term)) ||
      (fb.course && fb.course.toLowerCase().includes(term)) ||
      fb.quote.toLowerCase().includes(term)
    );
  });

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore
    }
    navigate({ to: "/sstadmin" });
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
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}

        {notice && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6" role="status">
            {notice}
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Callback Requests</h3>
                <p className="mt-1 text-sm text-gray-500">
                  List of all callback inquiries from the website.
                </p>
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

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`${
                    activeTab === "courses"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Course Enquiries
                </button>
                <button
                  onClick={() => setActiveTab("workshops")}
                  className={`${
                    activeTab === "workshops"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Workshop Enquiries
                </button>
                <button
                  onClick={() => setActiveTab("feedbacks")}
                  className={`${
                    activeTab === "feedbacks"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-1.5`}
                >
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  Student Feedbacks &amp; Ratings
                  {feedbacks.length > 0 && (
                    <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                      {feedbacks.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>
          <div className="overflow-x-auto">
            {activeTab === "feedbacks" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course / Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feedback
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFeedbacks.map((fb) => (
                    <tr key={fb._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(fb.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fb.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-amber-600 text-xs mr-1">
                            {fb.rating}/5
                          </span>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3.5 w-3.5 ${
                                s <= fb.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-100 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {fb.course || fb.role || "Student"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md whitespace-pre-wrap break-words">
                        "{fb.quote}"
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={fb.status || "Approved"}
                          onChange={(e) => handleFeedbackStatusChange(fb._id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                            fb.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : fb.status === "Hidden"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteFeedback(fb._id)}
                          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
                            confirmingFeedbackId === fb._id
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "text-red-600 hover:text-red-900"
                          }`}
                          title={
                            confirmingFeedbackId === fb._id
                              ? "Click again to confirm delete"
                              : "Delete Feedback"
                          }
                        >
                          {confirmingFeedbackId === fb._id ? (
                            "Confirm delete?"
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredFeedbacks.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                        No student feedbacks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Enquiry For
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
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
                      <td
                        className="px-6 py-4 text-sm text-gray-500 max-w-md whitespace-pre-wrap break-words"
                        title={cb.message}
                      >
                        {cb.message || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={cb.status || "Pending"}
                          onChange={(e) => handleStatusChange(cb._id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                            cb.status === "Approval"
                              ? "bg-green-100 text-green-800"
                              : cb.status === "Resolved"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
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
                          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
                            confirmingId === cb._id
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "text-red-600 hover:text-red-900"
                          }`}
                          title={
                            confirmingId === cb._id
                              ? "Click again to confirm delete"
                              : "Delete Request"
                          }
                        >
                          {confirmingId === cb._id ? (
                            "Confirm delete?"
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

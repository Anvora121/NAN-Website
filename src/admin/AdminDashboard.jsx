import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    // redirect to home
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="add-items">Add Items</NavLink>
          <NavLink to="users">Users</NavLink>
          <NavLink to="contacts">Contacts</NavLink>
          <NavLink to="orders">Orders</NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-6 text-left text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;

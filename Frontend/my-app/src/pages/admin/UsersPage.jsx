import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(data);
      } catch (err) {
        console.error("Users fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((u) => (
        <div key={u._id}>{u.email}</div>
      ))}
    </div>
  );
};

export default UsersPage;

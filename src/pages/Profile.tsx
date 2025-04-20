import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUser from "../components/CreateUser";
import LoginUser from "../components/LoginUser";
import { getCurrentUser } from "../services/appwrite";
import { showAlert } from "../utils/alert";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    showAlert("You have been logged out.");
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center px-4 py-12 text-white ">
      <h1 className="text-xl font-bold mb-6">Profile</h1>

      {user ? (
        <div className="bg-white/5 p-6 rounded-xl w-full max-w-md shadow-md space-y-4 text-center">
          <p className="text-white text-xl font-semibold">👋 Welcome, {user.name}</p>
          <p className="text-gray-300 text-sm">{user.email}</p>

          <button
            onClick={() => navigate("/saved")}
            className="bg-blue-500 px-6 py-3 rounded w-full font-semibold text-white"
          >
            🎬 Watch Later
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-6 py-3 rounded w-full font-semibold text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-6">
          {showCreateUser ? (
            <CreateUser onRegisterSuccess={() => setShowCreateUser(false)} />
          ) : (
            <LoginUser onLoginSuccess={setUser} />
          )}
          <button
            onClick={() => setShowCreateUser((prev) => !prev)}
            className="text-sm text-gray-400 underline w-full text-center mt-2"
          >
            {showCreateUser
              ? "Already have an account? Log in"
              : "Don't have an account yet? Create one"}
          </button>
        </div>
      )}
    </div>
  );
}

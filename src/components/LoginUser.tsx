import { useState } from "react";
import { loginUser } from "../services/appwrite";

interface Props {
  onLoginSuccess: (user: any) => void;
}

export default function LoginUser({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginUser(email, password);

    if (user) {
      alert(`Welcome, ${user.name}`);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-dark-200 p-6 rounded-xl w-full max-w-md text-white space-y-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded bg-white text-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded bg-white text-black"
      />

      <button type="submit" className="bg-accent px-6 py-3 rounded w-full text-white font-semibold">
        Log In
      </button>
    </form>
  );
}

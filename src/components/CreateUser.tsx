import { useState } from "react";
import { registerUser } from "../services/appwrite";

interface Props {
  onRegisterSuccess: () => void;
}

export default function CreateUser({ onRegisterSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      await registerUser({ name, email, password });
      alert("Account created! You can now log in.");
      setForm({ name: "", email: "", password: "" });
      onRegisterSuccess();
    } catch (error) {
      alert("Something went wrong during registration.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-200 p-6 rounded-xl w-full max-w-md text-white space-y-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 rounded bg-white text-black"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 rounded bg-white text-black"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 rounded bg-white text-black"
      />

      <button type="submit" className="bg-accent px-6 py-3 rounded w-full text-white font-semibold">
        Submit
      </button>
    </form>
  );
}

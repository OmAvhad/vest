import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/dashboard");
      toast.success("Login successful", { autoClose: 2000 });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full justify-center h-screen">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form className="flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="name@flowbite.com"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600" type="submit">Submit</Button>
          <div className="flex justify-between">
            <Link to="/">
              <HiArrowLeft className="text-xl text-blue-500" />
            </Link>
            <h2 className="text-gray-400">
              Already have an account?{" "}
              <Link to="/register" className="text-black">
                Register
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
}

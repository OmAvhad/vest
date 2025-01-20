import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // check if password is at least 8 characters, contains a number, and a special character and capital letter
      if (
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
      ) {
        toast.error(
          "Password must be at least 8 characters, contain a number, a special character, and a capital letter",
          {
            autoClose: 2000,
          }
        );
        return;
      }

      await register(name, username, password, email);
      navigate("/dashboard");
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full justify-center h-screen">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        <form className="flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name1"
              type="name1"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
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
          {loading ? (
            <Spinner className="w-10 h-10 text-blue-500" />
          ) : (
            <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
              Submit
            </Button>
          )}
          <div className="flex justify-between">
            <Link to="/">
              <HiArrowLeft className="text-xl text-blue-500" />
            </Link>
            <h2 className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-black">
                Login
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
}

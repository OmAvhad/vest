import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function CustomNav() {
  return (
    <Navbar fluid rounded className="border-b">
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">VEST</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 transition duration-300">Log in</Button>
        </Link>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

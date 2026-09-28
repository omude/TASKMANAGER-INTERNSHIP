import logo from "../assets/Group 1.svg";
import profile from "../assets/Group 6 (1).svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-[120px] py-[20px] flex justify-between border-b border-[#B8B6B6]">
      <div className="flex justify-between items-center gap-2">
        <img src={logo} alt="" className="w-[50px]" />
        <p className="text-[#2D0050] font-semibold font-[Signika Negative]">
          TaskDuty
        </p>
      </div>
      <div className="flex justify-between gap-7 items-center text-[#292929] font-[Signika Negative] font-medium">
        <Link to="/newtask">New Task</Link>
        <Link to="/mytask">All Tasks</Link>
        <img src={profile} alt="profile" className="w-[50px]" />
      </div>
    </nav>
  );
};

export default Navbar;

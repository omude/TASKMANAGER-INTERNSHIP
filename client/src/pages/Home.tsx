import Navbar from "../components/Navbar";
import image from "../assets/Component 1 (1).svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center mx-auto ">
        <div className="flex justify-between gap-7 items-center mb-12">
          <div className="w-[535px] translate-x-[-25px] ">
            <h1 className="text-[50px] font-medium font-[Signika Negative]">
              Manage your Tasks on{" "}
              <span className="text-[#974FD0]">TaskDuty</span>
            </h1>
            <p className="text-[#737171] text-[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
              tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at
              platea tempus duis non eget. Hendrerit tortor fermentum bibendum
              mi nisl semper porttitor. Nec accumsan.
            </p>
            <Link
              to="/mytask"
              className="bg-[#974FD0] text-[#FAF9FB] rounded-xl px-[25px] py-[10px] mt-4 inline-block"
            >
              Go to My Tasks
            </Link>
          </div>
          <div>
            <img src={image} alt="" className="translate-x-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

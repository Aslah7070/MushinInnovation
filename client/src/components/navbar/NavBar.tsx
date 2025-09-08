import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {LogIn} from "lucide-react";

import { CustomDropdown } from "../../re-usable/dropdown";
;
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { AuthController } from "../../controllers/index.controller";

const NavBar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
   const navigate=useNavigate()
   const dispatch=useAppDispatch()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline.fromTo(
      navRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
      }
    );
  }, []);



  const handleDropDown=async(item: { name?: string|undefined })=>{
    switch(item.name){
          case "Logout":
            await AuthController.logout(dispatch,navigate)
            break;
          case "Profile":
            navigate("/profile");
            break;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          default: null
    }
  }

  const items=[{name:"Profile",id:1},{name:"Logout",id:2}]
  return (
    <nav
      className={`fixed w-screen z-50 transition-all duration-300   ${
        isScrolled
          ? "bg-[#f5f5f3]"
          : " "
      }`}
    >
      <div ref={navRef} className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="flex justify-between px-6 h-18 mt-2 mb-2 items-center">
          <div className="flex-shrink-0">
            <Link className="flex flex-col items-center" to="/user">
 
              <p className="font-extrabold text-lg menu-item bg-gradient-to-r from-[#0b45b1] via-[#3b70d3] to-green-600 bg-clip-text text-transparent">
             TASKEASE
              </p>
            </Link>
          </div>
 

          <div className="hidden md:flex space-x-4 ">
            {isAuthenticated ? (
              <CustomDropdown
                label={
                  <div className="flex items-center rounded-full bg-transparent gap-2">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                }
                items={items}
            onClick={(item) =>handleDropDown(item)}
              />
            ) : (
              <Link
                to="/login"
                className="menu-item bg-primary text-black   font-semibold py-2 px-4 rounded transition-all duration-300  transform hover:scale-105"
              >
                Login
              </Link>
            )}

            <div className="menu-item bg-transparent"></div>
          </div>
          <div className="md:hidden">
              {isAuthenticated ? (
         
                <CustomDropdown
                  label={
                    <div className="flex items-center rounded-full gap-2">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  }
                     items={items}
            onClick={(item) =>handleDropDown(item)}
                />
              ) : (
                <LogIn onClick={()=>navigate("/login")} />
              )}
          </div>
        </div>
      </div>

    
    </nav>
  );
};

export default NavBar;

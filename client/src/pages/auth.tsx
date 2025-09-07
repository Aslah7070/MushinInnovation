import Login from "../components/Login";
import SignUp from "../components/SignUp";
type AuthProps={
    type:string
}

const Auth = ({ type }:AuthProps) => {
  return (
    <div className=" h-screen w-full bg-[#161616] flex items-center justify-center">
      {type === "login" ? (
             <Login/>
      ) : (
              <SignUp/>
      )}
    </div>
  );
};

export default Auth;

import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/*======= Left Content ========*/}
      <div className="relative z-10 flex w-full flex-1 items-center justify-center bg-white">
        <LoginForm />
      </div>
      {/*======== Right Content ========*/}
      <div
        className="relative hidden flex-1 items-center justify-center bg-cover bg-center xl:flex"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/fbZkT6j4/slider-Three.png')",
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 h-full w-full bg-black opacity-70"></div>
      </div>
    </div>
  );
};

export default Login;

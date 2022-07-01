import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../Hooks/useToken";
import auth from "../../../firebase.init";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(gUser);

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user || gUser || token) {
      navigate(from, { replace: true });
      toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
        autoClose: 4000,
      });
    }
  }, [user, gUser, token, navigate, from]);


  if (loading || gLoading) {
    return <Loading />;
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };




  
  if (gLoading) {
    return <Loading></Loading>;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleSignIn} className="hero mt-16 bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse px-0">
        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <p>
                  New to Todo App?{" "}
                  {/* <Link to="/registration" className="text-error">
                    Signup
                  </Link> */}
                </p>
              </label>
              <p className="text-red-500">{error?.message}</p>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-success text-white">Login</button>
            </div>
            <div className="divider">OR</div>
            <div className="form-control mt-2">
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-success hover:text-white"
              >
                Login with Google
              </button>
            </div>
            <p className="text-red-500">{gError?.message}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
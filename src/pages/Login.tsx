import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const result: any = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>

          <input
            className="w-full border p-3 rounded mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="w-full border p-3 rounded mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {loading ? "Please wait..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
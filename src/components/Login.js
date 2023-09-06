import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { TRUE } from "sass";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Pass is required");
      return;
    }
    setLoadingLogin(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingLogin(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-container col-12 col-sm-4 col-md-6 col-lg-4">
      <div className="title">Log in</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Email or username ..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-2">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            isShowPassword === false
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        {loadingLogin && <i class="me-2 fas fa-spinner fa-spin"></i>}
        Login
      </button>
      <div className="back">
        <i className="pe-1 fa-solid fa-chevron-left"></i>
        Go back
      </div>
    </div>
  );
}

export default Login;

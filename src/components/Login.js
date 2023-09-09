import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

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
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/home");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingLogin(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePressEnter = (e) => {
    if (e && e.keyCode === 13) {
      handleLogin();
    }
  };
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
          onKeyDown={(e) => handlePressEnter(e)}
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
        {loadingLogin && <i className="me-2 fas fa-spinner fa-spin"></i>}
        Login
      </button>
      <div className="back">
        <i className="pe-1 fa-solid fa-chevron-left"></i>
        <span onClick={handleBack}>Go back</span>
      </div>
    </div>
  );
}

export default Login;

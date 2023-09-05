import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="login-container col-12 col-sm-4 col-md-6 col-lg-4">
      <div className="title">Log in</div>
      <div className="text">Email or username</div>
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
          class={
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
      >
        Login
      </button>
      <div className="back">
        <i class="pe-1 fa-solid fa-chevron-left"></i>
        Go back
      </div>
    </div>
  );
}

export default Login;

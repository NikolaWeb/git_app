import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email, 
        password,
        avatar: avatar[0]
      });
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError(err.response.data.message);

    } finally {
      isLoading(false);
    }

  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>

      <div className="avatarContainer">
          <img src={avatar[0] || "/noavatar.jpg"} alt="" />
          <UploadWidget 
            uwConfig={{
              cloudName: "duhsxvy7n",
              uploadPreset: "auto-moto",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "avatars"
            }}
            setState={setAvatar}
            />
        </div>

      <div className="imgContainer">
        <img src="/bg_trans.png" alt="" />
      </div>
    </div>
  )
}

export default Register
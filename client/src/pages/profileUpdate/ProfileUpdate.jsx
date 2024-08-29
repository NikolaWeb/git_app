import "./profileUpdate.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  // const [password, setPassword] = useState(currentUser.password || "");

  const navigate = useNavigate();
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    const data = {
      username, 
      email
    }

    // Only include the password in the update if it has a value
    if(password) {
      data.password = password;
    }

    if(avatar.length > 0) {
      data.avatar = avatar[0]
    }

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, data);
      updateUser(res.data);
      navigate("/profile");
      
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } 
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
            {error && <span>{error}</span>}
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
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
    </div>
  );
}

export default ProfileUpdate;
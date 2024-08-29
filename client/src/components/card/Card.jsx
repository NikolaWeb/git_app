import { useContext, useEffect, useState } from "react";
import "./card.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Card = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest(`/posts/${item.id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    if (item?.id) {
      fetchPost();
    }
  }, [item?.id]);
  

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if(!isConfirmed) return;

    try {
      await apiRequest.delete(`/posts/${post.id}`);
      location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  const createChat = async (e) => {
    e.preventDefault();

    try {
      await apiRequest.post("/chats", { receiverId: item.userId });
      navigate("/profile");

    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.images[0]} alt="" />
      </Link>

      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.brand} {item.model}</Link>
        </h2>

        <h3 className="year">
          Year: {item.year}
        </h3>

        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}, {item.city}</span>
        </p>

        <p className="price">€ {item.price}</p>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img 
                src={item.vclType === "car" ? "/car.png" : item.vclType === "bike" ? "/bike.png" : "/buggy.png"} alt="" 
              />
              <span>{item.vclType}</span>
            </div>

            <div className="feature">
              <img 
                src={item.engType === "diesel" || item.engType === "petrol" ? "/car-engine.png" : "/electric.svg"} alt="" 
              />
              <span>{item.engType}</span>
            </div>

            <div className="icons">
              {
                  currentUser && currentUser.id === post.userId
                     &&
                <div className="icon" onClick={handleDelete}>
                  <img src="/delete.png" alt="" />
                </div>
              }

              {
                currentUser && currentUser.id !== item.userId
                           &&
                <div className="icon" onClick={createChat}>
                  <img src="/chat.png" alt="" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
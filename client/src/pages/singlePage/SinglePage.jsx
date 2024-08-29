import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useContext, useState } from "react";
import Map from "../../components/map/Map";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSave = async () => {
    if(!currentUser) {
      navigate("/login");
    }

    setSaved((prev) => !prev);

    try {
      await apiRequest.post("/users/save", {
        postId: post.id
      });

    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const createChat = async () => {

    if(!currentUser) {
      navigate("/login");
    }
    
    if(currentUser.id === post.userId) return;

    try {
      await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile");
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.brand} {post.model}</h1>
                <p>Condition: {post.postDetail.condition}</p>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address} {post.city}</span>
                </div>
                <div className="price">€ {post.price}</div>

                <div className="postUpdate">
                  {
                    currentUser && currentUser.id === post.userId
                              &&
                    <Link to={`/post/update/${post.id}`}>
                      <button>Edit Post</button>
                    </Link>
                  }
                </div>
              </div>

              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>

            <div 
              className="bottom"
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}
            >
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
        <p className="title">Specification</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/piston.png" alt="" />
              <div className="featureText">
                <span>Displacement</span>
                <p>{post.engType === "electric" ? "electric vehicle" : post.displacement + "cm³"}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/horse.png" alt="" />
              <div className="featureText">
                <span>Engine Power</span>
                <p>{post.power} hp</p>
              </div>
            </div>

            <div className="feature">
              <img src="/torque.png" alt="" />
              <div className="featureText">
                <span>Torque</span>
                <p>{post.postDetail.torque} N•M</p>
              </div>
            </div>
          </div>

          <p className="title">Utilities</p>
          <div className="sizes">
            <div className="size">
              <img src="/gearbox.png" alt="" />
              <span>{post.postDetail.gearbox}</span>
            </div>

            <div className="size">
              <img src="/differencial.png" alt="" />
              <span>{post.postDetail.driveSys === "AWD" ? "4X4 / AWD" : post.postDetail.driveSys}</span>
            </div>

            <div className="size">
              <img src="/car-engine.png" alt="" />
              <span>{post.engType}</span>
            </div>
          </div>

          <p className="title">Vehicle Info</p>
          <div className="listHorizontal" style={{ justifyContent: post.vclType === "car" && "space-between" }}>
            <div className="feature">
              <img src="/calendar.png" alt="" />
              <div className="featureText">
                <span>Year</span>
                <p>{post.year}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/mileage.png" alt="" />
              <div className="featureText">
                <span>Mileage</span>
                <p>{post.postDetail.mileage} km</p>
              </div>
            </div>

            {
              post.vclType !== "bike" && post.vclType !== "buggy"
                       &&
              <div className="feature">
                <img src="/car-body.png" alt="" />
                <div className="featureText">
                  <span>Body Style</span>
                  <p>{post.postDetail.bodyStyle}</p>
                </div>
              </div>
            }
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]}/>
          </div>

          <div className="buttons">
            
             
              <button onClick={createChat}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
            

            <button onClick={handleSave} style={{ background: saved ? "#fece51" : "white" }}>
              <img src="/save.png" alt="" />
              {saved ? "saved" : "save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
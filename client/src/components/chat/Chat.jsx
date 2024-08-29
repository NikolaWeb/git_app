import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js"
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../lib/notificationStore";

const Chat = ({ chats }) => {
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [chatList, setChatList] = useState(chats);


  const navigate = useNavigate();

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

 

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if(!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver })
      

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
  }, [chat]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const text = formData.get("text");
  if(!text) return;

  try {
    const res = await apiRequest.post("/messages/" + chat.id, { text });
    setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
    e.target.reset();

  } catch (err) {
    console.log(err);
  }
};


const handleDelete = async (id) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this chat?");

  if(!isConfirmed) return;

  try {
    await apiRequest.delete("/chats/" + id);
    setChatList(chatList.filter((c) => c.id !== id));
    if(chat && chat.id === id) {
      setChat(null);
    }
    navigate("/profile");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {
          chats?.map((c) => (
            <div key={c.id}
              className="message" 
              style={{ background: c.seenBy.includes(currentUser.id) ? "white" : "#fecd514e" }}
              onClick={() => handleOpenChat(c.id, c.receiver)}

            >
              <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
              <button onClick={(e) => {e.stopPropagation(); handleDelete(c.id);}}>
                <img src="/x-button.png" alt="" />
              </button>
            </div>
          ))
        }
      </div>
      {
              chat
               &&
        (<div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>

          <div className="center">
            {
              chat.messages.map((message) => (
                <div key={message.id}
                  className="chatMessage"
                  style={{
                    alignSelf: message.userId === currentUser.id ? "flex-start" : "flex-end",
                    textAlign: message.userId === currentUser.id ? "left" : "right"
                  }}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))
            }
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" id=""></textarea>
            <button>Send</button>
          </form>
        </div>)
      }
    </div>
  )
}

export default Chat
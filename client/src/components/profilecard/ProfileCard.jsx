import "./profileCard.scss";
import Card from "../card/Card";

const ProfileCard = ({ posts }) => {
  return (
    <div className="profileCard">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ProfileCard
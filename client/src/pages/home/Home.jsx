import "./home.scss";
import SearchBar from "../../components/searchBar/SearchBar";

const Home = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find vehicle of your dream, Get Your favourite car or bike or sell it</h1>
          <p>
          The website is a platform for buyers and sellers to connect. We are not responsible for the actual sale, including payment processing or vehicle delivery.
            Users must provide accurate information when listing or purchasing vehicles. Misrepresentation may lead to account suspension or termination.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Business</h2>
            </div>

            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>

            <div className="box">
              <h1>1200+</h1>
              <h2>Vehicles is Here</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg_trans.png" alt="" />
      </div>
    </div>
  )
}

export default Home
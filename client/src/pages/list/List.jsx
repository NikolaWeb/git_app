import "./list.scss";
import Filter from "../../components/filter/Filter";
import { Suspense, useContext } from "react";
import Card from "../../components/card/Card";
import { Await, Link, useLoaderData } from "react-router-dom";
import Map from "../../components/map/Map";

import { AuthContext } from "../../context/AuthContext";

const List = () => {
  const { currentUser } = useContext(AuthContext);

  const data = useLoaderData();  

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {
            !currentUser
               &&
            <p className="text-warning">You must be <Link to="/login">logged in</Link> or if you don't have an account go to <Link to="/register">register</Link>, if you want to post.</p>
          }
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => postResponse.data.map((post) => (
                <Card key={post.id} item={post} />                
              ))}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading map!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

export default List
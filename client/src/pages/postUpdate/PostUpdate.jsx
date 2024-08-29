import { useState } from "react";
import "./postUpdate.scss";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";


function PostUpdate() {
 
  const post = useLoaderData();
  const [error, setError] = useState("");
  const [images, setImages] = useState(post.images || []);
  const [value, setValue] = useState(post.postDetail.desc || "");

  const navigate = useNavigate();
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/posts/${post.id}`, {
        postData: {
          brand: inputs.brand,
          model: inputs.model,
          year: parseInt(inputs.year),
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          displacement: parseInt(inputs.displacement) || null,
          power: parseInt(inputs.power),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          vclType: inputs.vclType,
          engType: inputs.engType,
          images: images
        },
        postDetail: {
          desc: value,
          condition: inputs.condition,
          gearbox: inputs.gearbox,
          torque: parseInt(inputs.torque),
          bodyStyle: inputs.bodyStyle,
          mileage: parseInt(inputs.mileage),
          driveSys: inputs.driveSys,
        }
      });
      navigate("/" + res.data.id);

    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Edit Post</h1>
        <div className="wrapper">
          <form onSubmit={handleUpdate}>
            <div className="item">
              <label htmlFor="brand">Brand</label>
              <input id="brand" name="brand" type="text" defaultValue={post.brand}/>
            </div>
            <div className="item">
              <label htmlFor="model">Model</label>
              <input id="model" name="model" type="text" defaultValue={post.model}/>
            </div>
            <div className="item">
              <label htmlFor="year">Year</label>
              <input id="year" name="year" type="number" defaultValue={post.year}/>
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={post.price}/>
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={post.address}/>
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} defaultValue={post.postDetail.desc}/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={post.city}/>
            </div>
            <div className="item">
              <label htmlFor="displacement">Displacement</label>
              <input id="displacement" name="displacement" type="number" placeholder="cm³" defaultValue={post.displacement}/>
            </div>
            <div className="item">
              <label htmlFor="power">Engine Power</label>
              <input min={1} id="power" name="power" type="number" placeholder="hp" defaultValue={post.power}/>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={post.latitude}/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={post.longitude}/>
            </div>
            <div className="item">
              <label htmlFor="vclType">Vehicle Type</label>
              <select name="vclType" defaultValue={post.vclType}>
                <option value="car" defaultChecked>
                  car
                </option>
                <option value="bike">Bike</option>
                <option value="buggy">Buggy/SSV</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="engType">Engine Type</label>
              <select name="engType" defaultValue={post.engType}>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
                <option value="cng">Cng</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="condition">Condition</label>
              <select name="condition" defaultValue={post.postDetail.condition}>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="gearbox">Gearbox</label>
              <select name="gearbox" defaultValue={post.postDetail.gearbox}>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="semiauto">Semi-Auto</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="torque">Torque</label>
              <input
                id="torque"
                name="torque"
                type="number"
                placeholder="NM"
                defaultValue={post.postDetail.torque}
              />
            </div>
            <div className="item">
              <label htmlFor="bodyStyle">Body Style</label>
              <select name="bodyStyle" defaultValue={post.postDetail.bodyStyle}>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="wagon">Wagon</option>
                <option value="suv">Suv</option>
                <option value="bike">Bike</option>
                <option value="buggy">Buggy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="driveSys">Drive System</label>
              <select name="driveSys" defaultValue={post.postDetail.driveSys}>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="mileage">Mileage</label>
              <input min={0} id="mileage" name="mileage" type="number" placeholder="km" defaultValue={post.postDetail.mileage}/>
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="imgContainer">
          {images.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            cloudName: "duhsxvy7n",
            uploadPreset: "auto-moto",
            folder: "posts",
            multiple: true,
            maxFiles: 4
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default PostUpdate;
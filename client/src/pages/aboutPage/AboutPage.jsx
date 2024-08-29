import "./aboutPage.scss";

const AboutPage = () => {
  return (
    <div className="aboutPage">
      <h1>About Author</h1>
      <div className="imgContainer">
        <img src="/stena_profilna.jpg" alt="" />
      </div>

      <div className="textContainer">
        <p>
          P.G. suck as web developer, especially at design part, but he is known for his creative solutions and intricate
          character development. Born in a small industrial town, P.G. spent ir childhood surrounded by the
          rich folklore and haunting landscapes that would later inspire much of his work.
        </p>

        <p>
          When he’s not coding, P.G. enjoys mtb riding, photography, and spending time on bike rides.
           He is owner of  owner of a substantial collection of bikes.
        </p>

        <p>
          the idea for creating this site came from a love for cars and motorcycles as well as off-road driving and riding
        </p>
      </div>
    </div>
  )
}

export default AboutPage
import "./sponsors.scss";

const Sponsors = () => {
  return (
    <div className="sponsors">
        <h2>Thank you to</h2>
        <h1>Our sponsors</h1>
        <img className="logo" src="/logo.png" alt="" />

        <div className="sponsorsContainer">
          <div className="slide-left">
            <img src="/bmw.png" alt="" />
            <img src="/honda.png" alt="" />
            <img src="/corvette.png" alt="" />
            <img className="dakar" src="/dakar.png" alt="" />
            <img  src="/specialized.png" alt="" />
            <img  src="/monster.png" alt="" />
          </div>
          <div className="slide-right">
            <img  src="/polaris.png" alt="" />
            <img  src="/lexus.png" alt="" />
            <img className="husqvarna"  src="/husqvarna.png" alt="" />
            <img  src="/subaru.png" alt="" />
            <img  src="/fox.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Sponsors
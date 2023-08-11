import "./LandingPage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const LandingPage = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const image = [
    "https://github-production-user-asset-6210df.s3.amazonaws.com/115712038/259213505-0502d857-1821-4675-b6cf-d4c7e9765245.png",
    "https://github-production-user-asset-6210df.s3.amazonaws.com/115712038/259215864-3540e2d7-5831-40f2-b855-3c6d0b3d662d.png",
    "https://github.com/MarsMwau/Fithub-Frontend/assets/115712038/8e75e6c7-783b-414f-9e33-ffbd75423cf1",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === image.length - 1 ? 0 : prevIndex + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [index]);
  const spanTexts = [
    'Step at a Time!',
    'Day at a Time!',
    'Week at a Time!',
    'Month at a Time!',
    'Year at a Time!',
  ];
  return (
    <div className="body">
      <div id="home_top_div">
        <div id="home_head_div">
          <h1 className="home_main_head">Elevate Your Fitness Journey,One
            {spanTexts.map((text, i) => (
              <span key={i} style={{ opacity: index === i ? 1 : 0 }}>{text}</span>
            ))}
          </h1>
          <p className="home_main_sub-head">
            Elevate Your Wellness with FitHub: Your Journey, Your Joy, Your Way!
          </p>
          <Link to="/signup">
            <button>SIGN UP</button>
          </Link>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div id="home_body_3">
        <div id="home_body_3_sec1">
          <h2>Why FitHub?</h2>
          <p>
          FitHub is your ultimate fitness companion for an enjoyable health journey. Discover diverse exercises, savor meals while tracking nutrition, and get motivated to reach your body goals. Your adventure begins with FitHub's empowering support.
          </p>
        </div>
        <div id="home_body_3_sec2">
          <div>
            <img
              src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <h3>Learn. Track. Improve.</h3>
            <p>
              Keeping a workout diary helps you understand your habits and
              increases your likelihood of hitting your goals.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
              alt=""
            />
            <h3>Logging Simplified</h3>
            <p>
            Effortlessly monitor your daily calorie intake and stay mindful of your nutritional choices using our intuitive tracking system.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/7530436/pexels-photo-7530436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <h3>Stay Motivated</h3>
            <p>
            Stay motivated with personalized progress tracking all designed to keep your enthusiasm soaring high for a healthier, happier you.
            </p>
          </div>
        </div>
      </div>
      <div id="home_body_4">
        <div id="home_body_4_sec1">
          <h2>Discover a Healthier You with our Guidance!</h2>
        </div>
        <div id="home_corousel">
          <div className="home_corousel_sec_1">
            <div
              className="home_corousel_sec_1_1"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {image.map((e, i) => (
                <img className="home_corousel_img" src={e} key={i} alt="img" />
              ))}
            </div>
            <div className="slideshowDots text-center absolute bottom-0 left-1/2 ">
              {image.map((_, id) => (
                <div
                  key={id}
                  className={
                    index === id ? "slideshowDotActive" : "slideshowDot"
                  }
                  onClick={() => {
                    setIndex(id);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="Footer">
        <div id="footer_links">
          <a href="">Calorie Counter</a>
          <a href="">Sign Up</a>
          <a href="">Login</a>
          <a href="">Tips</a>
          <a href="">BMI Calculator</a>
          <a href="">Community Guidelines</a>
        </div>
        <p>© 2023 FitHub, Inc.</p>
      </div>
    </div>
  );
};
export default LandingPage;

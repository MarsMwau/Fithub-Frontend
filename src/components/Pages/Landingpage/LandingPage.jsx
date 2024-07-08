import "./Landingpage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const image = [
    "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4909003/pexels-photo-4909003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === image.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [index]);

  const spanTexts = [
    "Your Journey",
    "Your Joy",
    "Your Way",
  ];

  const navItems = [
    { title: "Home", path: "home" },
    { title: "Sign Up", path: "signup" },
    { title: "Log In", path: "login" },
    { title: "Calorie Counter", path: "https://www.webmd.com/diet/healthtool-food-calorie-counter" },
    { title: "BMI Calculator", path: "https://www.calculator.net/bmi-calculator.html" },
  ];

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div id="home_top_div">
          <div id="home_head_div">
            <h1 className="home_main_head">
            Elevate Your Wellness with FitHub:
              {spanTexts.map((text, i) => (
                <span key={i} style={{ opacity: index === i ? 1 : 0 }}>
                  {text}
                </span>
              ))}
            </h1>
            <p className="home_main_sub-head">
              Welcome to our fitness training program designed to help you achieve your fitness goals and transform your body and mind.
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
              FitHub is your ultimate fitness companion for an enjoyable health
              journey. Discover diverse exercises, savor meals while tracking
              nutrition, and get motivated to reach your body goals. Your
              adventure begins with FitHub's empowering support.
            </p>
          </div>
          <div id="home_body_3_sec2">
            <div>
              <img
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <h3>Learn, Track, Improve.</h3>
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
                Effortlessly monitor your daily calorie intake and stay mindful
                of your nutritional choices using our intuitive tracking system.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7530436/pexels-photo-7530436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <h3>Stay Motivated</h3>
              <p>
                Stay motivated with personalized progress tracking all designed
                to keep your enthusiasm soaring high for a healthier, happier
                you.
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
                  <img
                    className="home_corousel_img"
                    src={e}
                    key={i}
                    alt="img"
                  />
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
          <ul className="list-unstyled">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
          <p className="col-sm">
              &copy;{new Date().getFullYear()} FitHub is created with{" "}
              <span role="img" aria-label="heart" className="pulse">
                {" "}
                ❤️{" "}
              </span>{" "}
              by a group of friends
              | All rights reserved | Terms Of Service | Privacy
            </p>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;

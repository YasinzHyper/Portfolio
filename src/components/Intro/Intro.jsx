import { cn } from "@/lib/utils";
import DotPattern from "../magicui/dot-pattern";
import WordRotate from "../magicui/word-rotate";
import TypingAnimation from "../magicui/typing-animation";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import SparklesText from "../magicui/sparkles-text";

function Intro() {
  return (
    <section id="intro-section">
      <div className="intro">
        <div className="center">
          <div
            // data-aos="fade-right"
            // data-aos-duration="700"
            className="profile"
          >
            <img
              src="./images/profile-pic-nobg.png"
              alt="profile-pic"
              className="profile-pic "
            />
          </div>
        </div>

        <div
          //   data-aos="fade-left"
          //   data-aos-duration="1000"
          className="short-description relative flex flex-col items-start justify-center overflow-hidden rounded-lg "
        >
          <p>
            Hello! I am{" "}
            <span>
              <TypingAnimation
                text="Mohammed Yasin Zuhayr 👋"
                className="name inline text-2xl"
                duration={120}
              />
            </span>
          </p>
          {/* <br />
          A programmer who,
          <br />
          <span className="large-text">
            paints pixels of possibility with code...
          </span> */}
          <WordRotate
            className="text-4xl font-bold text-white"
            words={[
              "Problem Solver",
              "Developer",
              "Freelancer",
              "Open Source Enthusiast",
              "Passionate Programmer",
            ]}
          />
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
            )}
          />
        </div>

        <div
          //   data-aos="fade-right"
          //   data-aos-duration="1000"
          className="center occupation-description"
        >
          <p>
            I'm a<span className="occupation"> Student </span>
            
            at <span className="occupation"> MSRIT</span>, Bengaluru.
            <br />
            currently in my 2nd year of B.E. in Information Science and
            Engineering.
          </p>
        </div>

        <div
          //   data-aos="fade-left"
          //   data-aos-duration="1000"
          className="center occupation-description"
        >
          <p className="">
            I'm a passionate programmer, with a fascination for technology from
            a very young age.
            <br />
            I'm an enthusiastic learner. I can develop beautiful and innovative
            websites and mobile applications that can solve a wide variety of
            problems.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Intro;

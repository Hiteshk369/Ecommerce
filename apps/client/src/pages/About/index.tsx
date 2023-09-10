import { Link } from "react-router-dom";
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { Navbar } from "../../components";
import ProfilePic from "../../assets/Hitesh_img.png";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="w-full z-10 md:h-screen md:pt-16 pt-8 lg:px-36 md:px-24 px-6 flex items-center">
        <div className="max-w-[1240px] m-auto mt-16">
          <p className="md:text-4xl text-3xl font-semibold pb-12">
            About<span className="text-darkBlue">.</span>
          </p>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <img
                className="md:h-[100%]"
                src={ProfilePic}
                width="400"
                height="400"
                alt="profile"
              />
            </div>
            <div className="flex flex-col space-y-1 md:pt-0 pt-3">
              <p className="font-poppins md:text-base text-sm  text-gray-600 font-normal text-justify">
                &nbsp;&nbsp;&nbsp;&nbsp;Hi there, my name is Hitesh. I am a
                Bachelor of Technology student at Malla Reddy Institute of
                Technology in Hyderabad. I began web development in 2021. I
                specialize in creating responsive front-end user interfaces that
                link with APIs and other backend technologies.
              </p>

              <p className="font-poppins md:text-base text-sm text-gray-600 font-normal text-justify">
                I enjoy learning new technology and recognize that there are
                numerous methods to execute a task. Though I am most at ease
                developing front-end applications with HTML, CSS, Javascript,
                and React, I am a quick learner who can rapidly pick up new tech
                stacks as needed. Being a great developer, in my opinion, is
                more about choosing the appropriate tool for the job than it is
                about knowing a specific language.
              </p>

              <div className="flex items-center pt-3 space-x-4 md:pb-0 pb-10">
                <p className="text-darkBlue font-poppins text-base font-medium flex items-center gap-2">
                  My Links <ArrowRight />
                </p>
                <div className="flex items-center gap-4">
                  <Link to="https://github.com/Hiteshk369" target="_blank">
                    <div className="font-semibold text-gray-500 hover:text-darkBlue  hover:duration-300 hover:ease-in">
                      <Github size="1.6rem" />
                    </div>
                  </Link>
                  <Link
                    to="https://www.linkedin.com/in/hitesh-kumar-b9b3a2135/"
                    target="_blank"
                  >
                    <div className="font-semibold text-gray-500 hover:text-darkBlue  hover:duration-300 hover:ease-in">
                      <Linkedin size="1.6rem" />
                    </div>
                  </Link>
                  <Link to="https://github.com/Hiteshk369" target="_blank">
                    <div className="font-semibold text-gray-500 hover:text-darkBlue  hover:duration-300 hover:ease-in">
                      <Twitter size="1.6rem" />
                    </div>
                  </Link>
                  <Link to="https://twitter.com/Hitesh39934681" target="_blank">
                    <div className="font-semibold text-gray-500 hover:text-darkBlue  hover:duration-300 hover:ease-in">
                      <Instagram size="1.6rem" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

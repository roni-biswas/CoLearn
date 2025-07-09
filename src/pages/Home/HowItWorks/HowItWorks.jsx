import React from "react";
import { Parallax } from "react-parallax";
import Container from "../../../components/Container";
import bgImage from "../../../assets/howItWorks.jpg";

const steps = [
  {
    title: "Sign Up",
    desc: "Create your free account quickly using email or social login.",
  },
  {
    title: "Join Sessions",
    desc: "Browse and join sessions tailored to your learning goals.",
  },
  {
    title: "Collaborate",
    desc: "Engage with peers and mentors in real-time study groups.",
  },
  {
    title: "Achieve",
    desc: "Track progress and build knowledge together seamlessly.",
  },
];

const HowItWorks = () => {
  return (
    <Parallax
      bgImage={bgImage}
      strength={350}
      bgImageStyle={{ objectFit: "cover" }}
      className="min-h-[400px] relative text-white"
    >
      {/* Overlay */}
      <div className="absolute min-h-[400px] inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

      {/* Content */}
      <Container>
        <div className="py-16">
          <h2
            className="text-5xl font-extrabold mb-16 tracking-tight text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            How It Works
          </h2>

          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 bg-white/6 rounded-2xl backdrop-blur-xs border border-white/20 shadow-lg transition-transform duration-300 hover:scale-[1.05] text-center"
                data-aos="fade-up"
                data-aos-delay={200 + idx * 150}
              >
                <h3 className="text-2xl font-semibold mb-4 text-secondary">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Parallax>
  );
};

export default HowItWorks;

import { Link } from "react-router";

const PageHero = ({ title = "Login", heroBg = "" }) => {
  return (
    <div
      className="w-full h-[220px] bg-cover bg-center flex items-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 max-w-7xl text-center font-bold text-2xl mx-auto w-full">
        <p className="text-white">
          <Link to="/" className="text-secondary hover:underline">
            Home
          </Link>{" "}
          <span className="mx-2">{">"}</span> {title}
        </p>
      </div>
    </div>
  );
};

export default PageHero;

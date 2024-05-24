import OptimizedImage from "./OptimizedImage";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center border-t py-3">
      <OptimizedImage
        className="h-12 w-12 rounded-full"
        src="/images/logo.png"
        alt="Logo"
      />
      <h2 className="text-3xl font-bold">
        <span className="text-orange-500">Food</span> Point
      </h2>
      <h4 className="text-lg font-semibold mt-4">
        Developed by <span className="text-orange-500">Tanvin Ahmed</span>
      </h4>
      <small>Follow me</small>
      <div className="flex justify-center items-center gap-3">
        <a
          href="https://www.linkedin.com/in/tanvinbd"
          className="rounded-full cursor-pointer"
          target="_blank"
        >
          <OptimizedImage
            className="h-6 w-6 rounded-full"
            src="/images/social/linkedin.svg"
            alt="linkedin"
          />
        </a>
        <a
          href="https://github.com/Tanvin-Ahmed"
          className="rounded-full cursor-pointer"
          target="_blank"
        >
          <OptimizedImage
            className="h-6 w-6 rounded-full"
            src="/images/social/github.svg"
            alt="github"
          />
        </a>
        <a
          href="https://www.facebook.com/tanvinahmed.touhid"
          className="rounded-full cursor-pointer"
          target="_blank"
        >
          <OptimizedImage
            className="h-12 w-12 rounded-full"
            src="/images/social/facebook.svg"
            alt="facebook"
          />
        </a>
        <a
          href="https://twitter.com/TanvinAhmed11"
          className="rounded-full cursor-pointer"
          target="_blank"
        >
          <OptimizedImage
            className="h-6 w-6 rounded-full"
            src="/images/social/twitter.svg"
            alt="twitter"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

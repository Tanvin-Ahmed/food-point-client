import OptimizedImage from "../shared/OptimizedImage";

const DevInfo = () => {
  return (
    <div className="mt-12">
      <h1 className="text-4xl font-bold mb-3">About Developer</h1>
      <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-0 gap-4">
        <div>
          <OptimizedImage
            src="/images/developer.png"
            alt="developer"
            className="w-[300px] h-[300px] object-contain rounded-lg shadow-lg"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-2xl">A. N. M. Tanvin Ahmed</h2>
          <h4 className="text-lg font-semibold">
            Past Experience: FullStack Developer at PrismTechBD
          </h4>
          <p>
            University: Bangabandhu Sheikh Mujibur Rahman Science and Technology
            University
          </p>
          <div className="mt-3">
            <h4 className="text-lg font-semibold">Skills</h4>
            <p>
              <span className="font-semibold">Technologies:</span> JavaScript,
              TypeScript, ReactJS, NodeJS, ExpressJS, MongoDB, MySQL, Python,
              HTML, CSS, TailwindCSS, MUI, etc.
            </p>
            <p>
              <span className="font-semibold">Tools:</span> VS code, Git,
              Github, Vercel, Firebase, Netlify, etc.
            </p>
          </div>
          <div className="mt-3">
            <h4 className="text-lg font-semibold">Important links</h4>
            <div className="flex justify-start items-center gap-3">
              <a
                title="Resume"
                href="https://drive.google.com/file/d/198BnB9qTwU9VxsbCqZz9hqGc5wa-TFNw/view?usp=sharing"
                className="rounded-full cursor-pointer"
                target="_blank"
              >
                <OptimizedImage
                  className="h-6 w-6 rounded-full"
                  src="/images/social/resume.png"
                  alt="resume"
                />
              </a>
              <a
                title="Portfolio"
                href="https://tanvin-ahmed.web.app/"
                className="rounded-full cursor-pointer"
                target="_blank"
              >
                <OptimizedImage
                  className="h-6 w-6 rounded-full"
                  src="/images/social/portfolio.png"
                  alt="portfolio"
                />
              </a>
              <a
                title="LinkedIn"
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
                title="Github"
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
                title="Twitter"
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
              <a
                title="Facebook"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;

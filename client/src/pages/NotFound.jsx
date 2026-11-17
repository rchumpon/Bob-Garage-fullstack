import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-background via-secondary/90 to-background px-4 py-20 text-sm">
      {/* Page heading */}
      <h1 className="bg-linear-to-r from-primary/80 to-highlight bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
        404 Not Found
      </h1>

      {/* Decorative divider */}
      <div className="my-5 h-px w-full max-w-80 rounded bg-linear-to-r from-primary-foreground to-highlight md:my-7"></div>

      {/* Error message */}
      <p className="max-w-lg text-center text-base text-primary-foreground md:text-xl">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Back to Home button */}
      <Link
        to="/"
        className="group mt-10 flex items-center gap-2 rounded-full bg-primary px-7 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary-hover active:scale-95"
      >
        Back to Home
        <svg
          className="transition-transform group-hover:translate-x-1"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </main>
  );
};

export default NotFound;

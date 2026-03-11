export default function Guest({
  children,
  heading = "Sign In",
  description = "Enter your email and password to access the dashboard.",
  backHref = "/",
  backLabel = "Back to website",
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Form Column */}
        <div className="flex flex-1 flex-col">
          <div className="w-full max-w-md pt-10 mx-auto">
            <a
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-primary transition hover:text-secondary"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.708 5L7.5 10.208 12.708 15.417"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {backLabel}
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
            <div className="w-full max-w-md space-y-6">
              <header className="space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                    {heading}
                  </h1>
                  <p className="mt-3 text-sm text-slate-500">{description}</p>
                </div>
              </header>

              <div className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

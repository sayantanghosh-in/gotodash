import { useEffect, useState } from "react";
import { AlertCircleIcon } from "lucide-react";
// Shadcn components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Expenses from "@/components/modules/expenses";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
// Local components
import { Loader } from "@/components/loader";
// utils and constants
import { ThemeProvider } from "@/components/theme-provider";
import { checkSession } from "@/utils/api";
import { WEBSITE_URL } from "@/utils/constants";

function App() {
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    checkSession()
      ?.then((res) => {
        if (
          res.status === 200 &&
          typeof res?.user?.id === "string" &&
          res?.user?.id?.length > 0
        ) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          window.location.replace(
            WEBSITE_URL +
              "/login?redirect_url=https://gotodash.sayantanghosh.in"
          );
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsCheckingSession(false);
        window.location.replace(
          WEBSITE_URL + "/login?redirect_url=https://gotodash.sayantanghosh.in"
        );
      });
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-2 md:px-32">
        <Header />
        {isCheckingSession ? (
          <div className="w-full h-24 mt-4 md:mt-16 flex justify-center items-center">
            <Loader />
          </div>
        ) : isLoggedIn ? (
          <div className="mt-2 md:mt-4">
            <Expenses />
          </div>
        ) : (
          <div className="w-full h-24 mt-4 md:mt-16 flex justify-center items-center">
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to load GotoDash 😔</AlertTitle>
              <AlertDescription>
                <p>Oops! This is an unexpected error from our side.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Please check your network connection</li>
                  <li>Please try to refresh the page</li>
                  <li>
                    If nothing worked, please contact me on my{" "}
                    <a href="https://sayantanghosh.in" className="underline">
                      socials
                    </a>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

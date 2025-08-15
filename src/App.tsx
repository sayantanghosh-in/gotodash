import Header from "@/components/header";
import { ThemeProvider } from "./components/theme-provider";
import Expenses from "@/components/modules/expenses";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { checkSession } from "./utils/api";
import { WEBSITE_URL } from "./utils/constants";

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
        }
        setIsCheckingSession(false);
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
          <div className="w-full h-full flex justify-center items-center">
            Loading...
          </div>
        ) : isLoggedIn ? (
          <div className="mt-2 md:mt-4">
            <Expenses />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            Oops... Somethig went wrong. Contact{" "}
            <a href="https://sayantanghosh.in">Sayantan Ghosh</a>
          </div>
        )}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

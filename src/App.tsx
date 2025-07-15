import Header from "@/components/header";
import { ThemeProvider } from "./components/theme-provider";
import Expenses from "@/components/modules/expenses";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-2 md:px-32">
        <Header />
        <div className="mt-2 md:mt-4">
          <Expenses />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

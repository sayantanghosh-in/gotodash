import Header from "@/components/header";
import { ThemeProvider } from "./components/theme-provider";
import Expenses from "@/components/modules/expenses";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-8 md:px-64">
        <Header />
        <div className="mt-4">
          <Expenses />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

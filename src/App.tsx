import Header from "@/components/header";
import { ThemeProvider } from "./components/theme-provider";
import Expenses from "@/components/modules/expenses";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-8 md:px-64">
        <Header />
        <div className="mt-4">
          <Expenses />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

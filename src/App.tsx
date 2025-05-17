import Header from "@/components/Header";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-8 md:px-64">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;

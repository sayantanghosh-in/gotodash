import { CodeXml, Coffee } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className=" py-4 flex justify-between gap-2 items-center border-b-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            window.open("https://sgsh.in", "_blank");
          }}
          className="cursor-pointer"
        >
          sgsh.in
        </Button>
      </div>
      <a
        href="https://gotodash.sgsh.in"
        className="text-xl text-primary text-shadow-sm font-bold hover:underline hover:decoration-wavy"
      >
        GotoDash
      </a>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="cursor-pointer hover:animate-[sidenod_1s_ease-in-out_infinite]"
        >
          <a href="https://github.com/sgsh-in" target="_blank">
            <Coffee size={18} strokeWidth={2} className="text-white" />
          </a>
        </Button>
        <Button
          size="icon"
          className="cursor-pointer hover:animate-[sidenod_1s_ease-in-out_infinite]"
        >
          <a href="https://github.com/sgsh-in/gotodash" target="_blank">
            <CodeXml size={18} strokeWidth={2} className="text-white" />
          </a>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

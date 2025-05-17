import { CodeXml, Coffee } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="py-4 flex justify-between gap-2 items-center">
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
      <a href="https://gotodash.sgsh.in" className="text-primary font-bold">
        GotoDash
      </a>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sgsh-in"
          className="hover:animate-[sidenod_1s_ease-in-out_infinite]"
          target="_blank"
        >
          <Coffee size={18} strokeWidth={2} className="text-primary" />
        </a>
        <a
          href="https://github.com/sgsh-in/gotodash"
          className="hover:underline decoration-wavy"
          target="_blank"
        >
          <CodeXml size={18} strokeWidth={2} className="text-primary" />
        </a>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

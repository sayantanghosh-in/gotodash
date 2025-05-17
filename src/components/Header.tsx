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
        <a href="https://gotodash.sgsh.in" className="text-primary font-bold">
          GotoDash
        </a>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sgsh-in"
          className="hover:underline decoration-wavy"
          target="_blank"
        >
          Author
        </a>
        <a
          href="https://github.com/sgsh-in/gotodash"
          className="hover:underline decoration-wavy"
          target="_blank"
        >
          Project
        </a>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

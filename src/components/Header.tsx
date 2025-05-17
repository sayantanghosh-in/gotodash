import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="py-4 flex justify-between gap-2 items-center">
      <div className="flex items-center gap-2">
        <Button onClick={console.log} className="cursor-pointer">
          sgsh.in
        </Button>
        <a href="https://gotodash.sgsh.in">GotoDash</a>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sgsh-in/gotodash"
          className="hover:underline decoration-wavy"
          target="_blank"
        >
          Github
        </a>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

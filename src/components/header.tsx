import { CodeXml, Coffee } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import {
  GITHUB_PROFILE_URL,
  GOTODASH_GITHUB_PROJECT_URL,
  GOTODASH_URL,
  WEBSITE_URL,
} from "@/utils/constants";

const Header = () => {
  return (
    <div className="py-4 flex justify-between gap-2 items-center">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            window.open(WEBSITE_URL, "_blank");
          }}
          className="cursor-pointer text-xs md:text-reg"
        >
          sayantanghosh.in
        </Button>
      </div>
      <a
        href={GOTODASH_URL}
        className="text-xl text-primary text-shadow-sm font-bold hover:underline hover:decoration-wavy"
      >
        GotoDash
      </a>
      <div className="flex items-center gap-2">
        <Button
          asChild
          size="icon"
          className="cursor-pointer hover:animate-[sidenod_1s_ease-in-out_infinite]"
        >
          <a href={GITHUB_PROFILE_URL} target="_blank">
            <Coffee size={18} strokeWidth={2} className="text-white" />
          </a>
        </Button>
        <Button
          asChild
          size="icon"
          className="cursor-pointer hover:animate-[sidenod_1s_ease-in-out_infinite]"
        >
          <a href={GOTODASH_GITHUB_PROJECT_URL} target="_blank">
            <CodeXml size={18} strokeWidth={2} className="text-white" />
          </a>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

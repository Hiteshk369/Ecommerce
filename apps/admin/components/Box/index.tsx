import { twMerge } from "tailwind-merge";
import { Separator } from "../ui/separator";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <>
      <div className={twMerge("h-fit w-full", className)}>
        <div>{children}</div>
      </div>
      <Separator className="bg-neutral-700" />
    </>
  );
};

export default Box;

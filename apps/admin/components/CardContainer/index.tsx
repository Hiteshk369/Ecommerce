import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IndianRupee, MoveUpRight } from "lucide-react";

const CardContainer = () => {
  return (
    <div className="h-full w-full flex justify-between">
      <Card className="bg-cardColor w-[30%] border-neutral-700">
        <CardHeader>
          <CardTitle className="text-pearl flex items-center justify-between gap-3">
            <p className="text-lg tracking-wide font-normal">Total Sales</p>
            <IndianRupee className="w-7 h-7 p-[5px] bg-[#151515] rounded-full flex items-center justify-center text-main" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <IndianRupee size={25} className="text-pearl" />
            <p className="text-pearl text-3xl font-bold">10,89,065.67</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-cardColor w-[30%] border-neutral-700">
        <CardHeader>
          <CardTitle className="text-pearl">Total Sales</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-cardColor w-[30%] border-neutral-700">
        <CardHeader>
          <CardTitle className="text-pearl">Total Sales</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CardContainer;

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IndianRupee, MoveUpRight, Users, ShoppingBag } from "lucide-react";

const CardContainer = () => {
  const cardData = useMemo(
    () => [
      {
        id: 1,
        title: "Total Sales",
        Icon: IndianRupee,
        content: "10,89,065.67",
        footerContent: "20.9%",
      },
      {
        id: 2,
        title: "Total Orders",
        Icon: ShoppingBag,
        content: "9907",
        footerContent: "14.1%",
      },
      {
        id: 3,
        title: "Total Users",
        Icon: Users,
        content: "1679",
        footerContent: "29.4%",
      },
    ],
    []
  );
  return (
    <div className="h-full w-full flex justify-between">
      {cardData.map((card) => (
        <Card key={card.id} className="bg-cardColor w-[30%] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-pearl flex items-center justify-between gap-3">
              <p className="text-lg tracking-wide font-normal">{card.title}</p>
              <card.Icon size={20} className=" text-main" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {card.id === 1 && (
                <IndianRupee size={25} className="text-pearl" />
              )}

              <p className="text-pearl text-3xl font-bold">{card.content}</p>
            </div>
            <div className="flex items-center pt-3 gap-2">
              <MoveUpRight size={15} className="text-main" />
              <p className="text-main text-sm font-normal">
                {card.footerContent}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardContainer;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import ProductDropDown from "../ProductDropDown";

const ProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-center bg-transparent text-pearl"
        >
          <Plus size={18} />
          <p className="font-medium text-base">Add product to store</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Fill in product details. Click add when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category
            </Label>
            <ProductDropDown />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Price
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Stock
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="w-[100%] h-40 flex items-center justify-center">
            <div className="w-[80%] bg-black">
              <p>hello</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

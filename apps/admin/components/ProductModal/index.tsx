"use client";
import React, { useState } from "react";
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
import { Plus, Trash2, Upload } from "lucide-react";
import ProductDropDown from "../ProductDropDown";
import Image from "next/image";

const ProductModal = () => {
  const [imageAsset, setImageAsset] = useState<any>(null);
  const handleUpload = (e: any) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageAsset(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-center  text-pearl"
        >
          <Plus size={18} />
          <p className="font-medium text-base">Add product to store</p>
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#151515] max-w-[425px] md:max-w-[600px] sm:h-full md:h-[90%]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Fill in product details. Click add when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-0">
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
              Brand
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input id="name" className="col-span-3" />
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
          <div className="grid grid-cols-4 h-48  items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Image
            </Label>
            {!imageAsset ? (
              <div className="col-span-3 bg-[#0c0a09] rounded-md cursor-pointer h-full w-full flex flex-col justify-center items-center gap-2 relative">
                <Upload className="text-neutral-300 text-3xl" />
                <p className="text-neutral-300">Click here to upload</p>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  onChange={handleUpload}
                />
              </div>
            ) : (
              <div className="col-span-3 relative h-48 w-full">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={imageAsset}
                  alt="uploaded image"
                />
              </div>
            )}
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

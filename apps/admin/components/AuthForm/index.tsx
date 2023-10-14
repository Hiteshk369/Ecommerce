"use client";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import SignIn from "next-auth/react";

const AuthForm = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {pathName === "/register"
            ? "Create an account"
            : "Login to your account"}
        </CardTitle>
        <CardDescription>
          {pathName === "/register"
            ? "  Enter your email and password below to create your account"
            : "  Enter your email and password below to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password ">Password</Label>
          <Input id="password" type="password" />
        </div>
        {pathName === "/register" && (
          <div className="grid gap-2">
            <Label htmlFor="password ">Confirm Password</Label>
            <Input id="password" type="password" />
          </div>
        )}
        {pathName === "/login" && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full">
          {pathName === "/register" ? "Create Account" : "Login"}
        </Button>
        <div className="pt-3">
          {pathName === "/register" ? (
            <p className="text-neutral-300">
              Have an account?{" "}
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-neutral-300">
              New to Ecommerce Dashboard?{" "}
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

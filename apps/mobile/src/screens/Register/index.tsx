import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "../../components/input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/registerStack";

interface valuesTypes {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [secureText, setSecureText] = useState(false);

  const loginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Must be 8 or more characters long" }),
    name: z.string().min(1, { message: "Name is required" }),
  });

  const handleFormSubmit = (values: valuesTypes) => {
    console.log(values.name);
    console.log(values.email);
    console.log(values.password);
  };
  return (
    <SafeAreaView className="h-full w-full bg-background_color">
      <KeyboardAvoidingView>
        <View className="mb-6 w-full h-48 backdrop-blur-lg ">
          <Text className="absolute text-4xl font-bold items-center py-24 px-6 text-pearl  justify-end">
            Create an Account{" "}
            <Text className="text-6xl text-buttonGreen">.</Text>
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={toFormikValidationSchema(loginFormSchema)}
        >
          {({ handleChange, values, errors, touched }) => (
            <View className="gap-10 w-100 p-5">
              <View>
                <Input
                  label="Name"
                  id="name"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  placeholder="Enter Your name"
                  setSecureText={setSecureText}
                />
                {errors.name || touched.name ? (
                  <Text className="text-sm px-4 py-1 text-red-500">
                    {errors.name}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View>
                <Input
                  label="Email"
                  id="email"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="Enter Your email"
                  setSecureText={setSecureText}
                />
                {errors.email || touched.email ? (
                  <Text className="text-sm px-4 py-1 text-red-500">
                    {errors.email}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View>
                <Input
                  label="Password"
                  id="password"
                  onChangeText={handleChange("password")}
                  value={values.password}
                  placeholder="Enter Your password"
                  isSecure={true}
                  secureText={secureText}
                  setSecureText={setSecureText}
                />
                {errors.password || touched.password ? (
                  <Text className="text-sm px-4 py-1 text-red-500">
                    {errors.password}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <TouchableOpacity
                disabled={errors.email || errors.password ? true : false}
                onPress={() => handleFormSubmit(values)}
                className="bg-buttonGreen border shadow-xl shadow-buttonGreen rounded-md items-center self-center w-[90%]"
              >
                <Text className="text-2xl p-2 text-background_color font-bold">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View className="border-b-2 w-[90%] self-center pt-8  border-subGray  relative">
          <View className="absolute items-center bg-background_color  rounded-md px-2  z-[10] top-[18] left-[62] flex-row justify-center">
            <Text className="text-sm text-pearl">
              Already Have an Account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-base font-bold text-buttonGreen ">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

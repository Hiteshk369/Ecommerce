/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "../../components/input";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/registerStack";

interface valuesTypes {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const loginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  const handleFormSubmit = (values: valuesTypes) => {
    console.log(values.email);
    console.log(values.password);
  };

  const [secureText, setSecureText] = useState(false);

  return (
    <SafeAreaView className="h-full w-full bg-background_color">
      <View className="mb-6 w-full h-48 backdrop-blur-lg ">
        <Text className="absolute text-4xl font-bold items-center py-24 px-6  text-pearl  justify-end">
          Login<Text className="text-6xl text-buttonGreen">.</Text>
        </Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={toFormikValidationSchema(loginFormSchema)}
      >
        {({ handleChange, values, errors, touched }) => (
          <View className="gap-10 w-100 p-5">
            <View>
              <Input
                label="E-mail"
                id="email"
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Enter Your email"
                setSecureText={setSecureText}
              />
              {errors.email || touched.email ? (
                <Text className="text-sm text-red-500">{errors.email}</Text>
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
                placeholder="Enter Your Password"
                isSecure={true}
                secureText={secureText}
                setSecureText={setSecureText}
              />
              {errors.password && touched.password ? (
                <Text>{errors.password}</Text>
              ) : (
                <></>
              )}
              <TouchableOpacity>
                <View className="self-end p-2">
                  <Text className="text-subGray text-base underline underline-offset-8">
                    Forgot Password
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              disabled={errors.email || errors.password ? true : false}
              onPress={() => handleFormSubmit(values)}
              className="bg-buttonGreen border shadow-xl shadow-buttonGreen rounded-md items-center self-center w-[90%]"
            >
              <Text className="text-2xl p-2 text-black font-bold">Login</Text>
            </TouchableOpacity>
            <View className="flex-row  justify-center mb-5">
              <TouchableOpacity className="w-[45%] mr-6 items-center bg-background_color justify-center flex-row border-buttonGreen border  rounded-md">
                <AntDesign name="google" size={20} color="#38c7a4" />
              </TouchableOpacity>
              <TouchableOpacity className="w-[45%] p-2 items-center justify-center flex-row bg-background_color border-buttonGreen border rounded-md">
                <AntDesign name="github" size={20} color="#38c7a4" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <View className="border-b-2 w-[90%] self-center pt-3  border-gray_300  relative">
        <View className="absolute items-center bg-background_color rounded-md px-1 z-[10] top-[-1] left-[63] flex-row justify-center">
          <Text className="text-sm text-pearl">Dont Have an Account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-base font-bold text-buttonGreen">
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

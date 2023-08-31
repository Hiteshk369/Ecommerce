import React, { Dispatch, SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { Colors } from "../../constants/Colors";

interface InputProps {
  label: string;
  id: "name" | "email" | "password";
  value: string;
  placeholder?: string;
  isSecure?: boolean;
  secureText?: boolean;
  setSecureText: Dispatch<SetStateAction<boolean>>;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  value,
  placeholder,
  isSecure,
  secureText,
  setSecureText,
  onChangeText,
}) => {
  return (
    <KeyboardAvoidingView className="w-full relative">
      <View className="absolute bg-background_color rounded-md z-[10] top-[-12] left-5 px-2  flex-row justify-center">
        <Text className="text-base text-buttonGreen">{label}</Text>
      </View>
      <View className="flex-row items-center relative">
        <TextInput
          className="text-subGray border w-full h-14 bg-background_color  shadow-md shadow-subGray  border-subGray px-5 text-lg rounded-lg"
          id={id}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#909090"
          secureTextEntry={secureText}
          onChangeText={onChangeText}
        />

        {isSecure &&
          (secureText ? (
            <Pressable
              className="absolute right-5"
              onPress={() => setSecureText(false)}
            >
              <Entypo name="eye" size={24} color="gray" />
            </Pressable>
          ) : (
            <Pressable
              className="absolute right-5"
              onPress={() => setSecureText(!secureText)}
            >
              <Entypo name="eye-with-line" size={24} color="gray" />
            </Pressable>
          ))}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray_100,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "400",
  },
  icon: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

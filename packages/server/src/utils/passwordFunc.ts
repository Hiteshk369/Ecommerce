import bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, 14);
    return hash;
  } catch (error) {
    let message = "Encryption failed";
    if (error instanceof Error) {
      message = error.message;
      throw new Error(message);
    }
  }
};

export const verifyPassword = async (
  userPassword: string,
  hashedPassword: string
) => {
  try {
    const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);
    if (passwordMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Password comparison error", error);
    let message = "Password comparison error";
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};

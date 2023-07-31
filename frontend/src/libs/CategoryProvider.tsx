import { createContext, useContext, useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

export type UseCategory = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

const categoryContext = createContext<UseCategory>(undefined!);

const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [category, setCategory] = useState<string>("store");

  return (
    <categoryContext.Provider value={[category, setCategory]}>
      {children}
    </categoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(categoryContext);

export default CategoryProvider;

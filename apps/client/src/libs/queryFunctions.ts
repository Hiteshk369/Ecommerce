import { queryClient } from "../App";

export const handleRefetchCartItems = () =>
  queryClient.refetchQueries(["cartItems"]);

export const handleRefetchByCategory = () =>
  queryClient.refetchQueries(["productByCategory"]);

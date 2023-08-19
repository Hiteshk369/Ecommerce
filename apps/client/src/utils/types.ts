const productCategories = ["mobile", "laptop", "watch", "headphone"] as const;

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: (typeof productCategories)[number];
  brand: string;
  price: number;
  imageUrl: string;
  reviews?: [
    {
      user: string;
      name: string;
      rating: number;
      comment: string;
    }
  ];
  numOfReviews?: number;
  stock?: number;
  userId: string;
  wishlist?: boolean;
}

export interface ICartItems {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };

  quantity: number;
}

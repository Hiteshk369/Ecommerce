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
    },
  ];
  numOfReviews?: number;
  stock?: number;
  userId: string;
}

export interface ICartItems {
  _id: string;
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
  quantity: number;
}

export interface IOrder {
  _id: string;
  user: string;
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    phoneNumber: string;
  };
  paymentInfo: {
    id: string;
    itemsPrice: number;
    totalPrice: number;
    orderDate: string;
    paymentStatus: string;
    paymentDate: string;
    taxPrice: number;
    deliveryCharges: number;
    discount: number;
    deliveryStatus: string;
    deliveryDate: string;
  };
  orderItems: [
    {
      _id: string;
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    },
  ];
  createdAt: string;
}

export interface IOrderItems {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  shortDescription: string;
  fullDescription: string;
  genre: string;
  condition: "new" | "like-new" | "good" | "fair";
  price: number;
  images: string[];
  postedBy: {
    _id: string;
    name: string;
    email: string;
  };
  location: string;
  availability: "available" | "sold" | "reserved";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  bookId: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
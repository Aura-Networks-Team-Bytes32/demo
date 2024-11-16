export type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Jordan",
    description: "Men's Short-Sleeved T-Shirt",
    price: 39.95,
    imageSrc: "/jordan_tshirt.png",
    imageAlt: "Jordan T-Shirt",
  },
  {
    id: 2,
    name: "Jordan Brooklyn Fleece",
    description: "Men's Trousers",
    price: 49.95,
    imageSrc: "/jordan_fleece.png",
    imageAlt: "Jordan Fleece",
  },
  {
    id: 3,
    name: "Air Jordan Wordmark",
    description: "Fleece Pullover Hoodie",
    price: 79.95,
    imageSrc: "/jordan_hoodie.png",
    imageAlt: "Jordan Hoodie",
  },
  {
    id: 4,
    name: "Jordan Flight Essentials 85",
    description: "Men's T-Shirt",
    price: 29.95,
    imageSrc: "/jordan_essential.png",
    imageAlt: "Jordan Essential",
  },
];

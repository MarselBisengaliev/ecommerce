interface ContentType {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface ProductType extends ContentType {
  details: string;
  image: Object[][];
  name: string;
  price: number;
  slug: { _type: string; current: string };
  quantity?: number;
}

interface BannerType extends ContentType {
  buttonText: string;
  desc: string;
  discount: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
}

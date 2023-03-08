import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import Image from "next/image";

type Props = {
  product: ProductType;
};

const Product = ({ product: { image, name, slug, price } }: Props) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            width={250}
            height={250}
            className="product-image"
            src={urlFor(image && image[0]).url()}
            alt="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;

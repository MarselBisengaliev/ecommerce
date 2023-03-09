import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Product } from "../../components";
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from "../../lib/client";


type Props = {
  product: ProductType;
  products: ProductType[];
};

const ProductDetails = ({ product, products }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();
  const { image, name, details, price } = product;
  const router = useRouter();

  useEffect(() => {
    setIndex(0);
  }, [router.query.slug]);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              width="400"
              height="400"
              src={urlFor(image[image[index] ? index : 0]).url()}
              alt="image"
              className="product-detail-image"
            />
          </div>
          <div className="small-image-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                width={70}
                height={70}
                src={urlFor(item).url()}
                alt="small-image"
                onMouseEnter={() => setIndex(i)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: ProductType) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;

  const product: ProductType[] = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;

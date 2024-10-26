"use client";
import { SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductMenu() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios.get(`${process.env.BACKEND}/`).then((response) => {
        const data = response.data;
        setData(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }, []);
  // console.log(data);
  if (loading) {
    return (
      <div className="bg-mainbg min-h-screen">
        <Center>
          <Spinner size="xl" className="my-auto" />
        </Center>
      </div>
    );
  } else {
    return (
      <div className="bg-mainbg min-h-screen">
        <SimpleGrid
          justifyItems={"center"}
          columns={3}
          width="fit"
          minChildWidth="350px"
          spacingX="1"
          spacingY="2"
        >
          {data.map((product) => {
            return (
              <ProductCard
              key={product.id}
                name={product.name}
                id={product.id}
                price={product.price}
                cover={product.cover}
                description={product.description}
                quantity={product.quantity}
              />
            );
          })}
        </SimpleGrid>
      </div>
    );
  }
}

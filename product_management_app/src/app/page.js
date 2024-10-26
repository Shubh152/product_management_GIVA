"use client";
import { Stack } from "@chakra-ui/react";
import ProductMenu from "../app/_components/ProductMenu";
import Navbar from "../app/_components/Navbar";

export default function Home() {
  return (
    <div className="bg-mainbg min-h-full">
      <Navbar />
      <Stack direction="row" paddingY="20px" paddingX="20px">
        <Stack paddingX="10px" spacing={5} width="full">
          <ProductMenu />
        </Stack>
      </Stack>
    </div>
  );
}

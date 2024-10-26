"use client";
import Navbar from "../_components/Navbar";
import ProductForm from "../_components/ProductForm";
import { Stack } from "@chakra-ui/react";
export default function Admin() {
  return (
    <div className="bg-mainbg">
      <Navbar />
      <Stack paddingX="30px" paddingY="20px">
        <ProductForm />
      </Stack>
    </div>
  );
}

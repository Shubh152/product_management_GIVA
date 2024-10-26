"use client";
import Navbar from "../../_components/Navbar.jsx";
import UpdateForm from "../../_components/UpdateForm.jsx";
import { Stack } from "@chakra-ui/react";
export default function Admin() {
  return (
    <div className="bg-mainbg">
      <Navbar />
      <Stack paddingX="30px" paddingY="20px">
        <UpdateForm />
      </Stack>
    </div>
  );
}

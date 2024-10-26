"use client";

import { Button, ButtonGroup, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function MainButton() {
  const nextRouter = useRouter();
  const logoutUser = async () => {
    window.localStorage.removeItem("token");
    if (location.href == "/") location.reload();
    else nextRouter.push("/");
  };
  return (
    <ButtonGroup spacing={3}>
      {window.localStorage.getItem("token") && (
        <>
          <Button
            colorScheme="brand"
            variant={"solid"}
            size="sm"
            onClick={() => {
              nextRouter.push("/admin");
            }}
          >
            Add New Product
          </Button>
          <Button
            colorScheme="brand"
            variant={"solid"}
            size="sm"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </>
      )}
      {!window.localStorage.getItem("token") && (
        <Button
          colorScheme="brand"
          variant={"solid"}
          size="sm"
          onClick={() => {
            nextRouter.push("/signin");
          }}
        >
          Signin/Signup
        </Button>
      )}
      <Button
        colorScheme="brand"
        variant={"solid"}
        size="sm"
        onClick={() => {
          nextRouter.push("/");
        }}
      >
        Home
      </Button>
    </ButtonGroup>
  );
}

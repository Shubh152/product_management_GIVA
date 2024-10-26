"use client";

import { Heading, Input, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export default function SigninForm() {
  const [userName, setName] = useState("");
  const [passWord, setPass] = useState("");
  const [adminKey, setKey] = useState("");
  const toast = useToast();
  const nextRouter = useRouter();

  const signinUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND}/signin/`,
        {
          username: userName,
          password: passWord,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status == 200) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", response.data);
        }
        toast({
          position: "top",
          description: "Signin Successfull",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        nextRouter.push("/");
      } else {
        console.log(response.status);
        toast({
          position: "top",
          description: "Wrong Credentials",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const signupUser = async () => {
    try {
      const response = axios.post(
        `${process.env.BACKEND}/signup/`,
        {
          username: userName,
          password: passWord,
          adminkey: adminKey,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status != 401) {
        toast({
          position: "top",
          description: "Signup Successfull",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        nextRouter.push("/");
      } else {
        toast({
          position: "top",
          description: "Wrong Credentials",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="bg-mainbg min-h-screen p-x-auto">
      <Stack spacing={3} alignItems={"center"} paddingTop={"100"}>
        <Heading fontSize="20px" margin="10px">
          Username
        </Heading>
        <Input
          borderWidth="2px"
          borderColor="brand.600"
          placeholder="Username"
          value={userName}
          onChange={(event) => {
            setName(event.target.value);
          }}
          width={"sm"}
          size="sm"
        />
        <Heading fontSize="20px" margin="10px">
          Password
        </Heading>
        <Input
          width={"sm"}
          borderWidth="2px"
          borderColor="brand.600"
          placeholder="Password"
          value={passWord}
          onChange={(event) => {
            setPass(event.target.value);
          }}
          size="sm"
        />
        <Heading fontSize="20px" margin="10px">
          Admin Key
        </Heading>
        <Input
          width={"sm"}
          borderWidth="2px"
          borderColor="brand.600"
          placeholder="Required for signup only"
          value={adminKey}
          onChange={(event) => {
            setKey(event.target.value);
          }}
          size="sm"
        />
        <Stack direction={"row"}>
          <Button colorScheme="brand" variant={"solid"} onClick={signinUser}>
            Signin
          </Button>
          <Button colorScheme="brand" variant={"ghost"} onClick={signupUser}>
            Signup
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

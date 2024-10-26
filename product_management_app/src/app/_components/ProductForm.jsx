"use client";
import {
  Text,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Input,
  Textarea,
  Stack,
  Box,
  Img,
  HStack,
  Heading,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { browser } from "process";
import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function ProductForm() {
  const [coverImage, setCover] = useState([]);
  const [productName, setName] = useState("");
  const [productDescription, setDesc] = useState("");
  const [productPrice, setPrice] = useState(100);
  const [productQuantity, setQuantity] = useState(1);
  const toast = useToast();
  const nextRouter = useRouter();
  const addCover = (event) => {
    setCover([...event.target.files]);
  };

  const postForm = async () => {
    try {
      const token = document.cookie
      console.log(token);
      
      const response = await axios.post(
        `${process.env.BACKEND}/admin/`,
        {
          productName,
          productDescription,
          productPrice,
          coverImage,
          productQuantity,
        },
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // for <input type=file> data
          },
        }
      );
      toast({
        position: "top",
        description: "Product Details Sent",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      nextRouter.push("/");
    } catch (error) {
      console.error(error);
      toast({
        position: "top",
        description: "Something went wrong, Try Again",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const clearForm = async () => {
    setName("");
    setDesc("");
    setPrice(100);
    setQuantity(1);
    toast({
      position: "top",
      description: "Form cleared",
      status: "success",
      isClosable: true,
      duration: 6000,
    });
  };
  return (
    <>
      <Stack>
        <Heading fontSize="20px" margin="10px">
          Product Name
        </Heading>
        <Input
          borderWidth="2px"
          borderColor="brand.600"
          placeholder="Product Name"
          value={productName}
          onChange={(event) => {
            setName(event.target.value);
          }}
          size="sm"
        />
        <Heading fontSize="20px" margin="10px">
          Product Description
        </Heading>
        <Textarea
          borderWidth="2px"
          borderColor="brand.600"
          maxLength={150}
          minLength={20}
          value={productDescription}
          onChange={(event) => {
            setDesc(event.target.value);
          }}
          placeholder="Product Description"
          size="sm"
        />
        <Button
          width="200px"
          margin="10px"
          colorScheme="red"
          onClick={() => {
            setDesc("");
          }}
        >
          Clear Description
        </Button>
        <Heading fontSize="20px" margin="10px">
          Product Price
        </Heading>
        <NumberInput
          max={500000}
          defaultValue={100}
          min={1}
          value={productPrice}
          onChange={(event) => {
            setPrice(parseInt(event));
          }}
        >
          <NumberInputField borderWidth="2px" borderColor="brand.600" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Heading fontSize="20px" margin="10px">
          Product Quantity
        </Heading>
        <NumberInput
          max={500000}
          defaultValue={1}
          min={1}
          value={productQuantity}
          onChange={(event) => {
            setQuantity(parseInt(event));
          }}
        >
          <NumberInputField borderWidth="2px" borderColor="brand.600" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Heading fontSize="20px" margin="10px">
          Add One Cover Image :
        </Heading>
        <Input
          borderWidth="2px"
          borderColor="brand.600"
          onChange={addCover}
          backgroundColor="brand.900"
          type="file"
          accept="image/*"
        />
        <Text fontSize="20px" margin="10px">
          Selected File:
        </Text>
        <Box
          padding="20px"
          borderStyle="dashed"
          borderColor="gray"
          borderWidth="2px"
        >
          {coverImage.length == 0 ? (
            <Text>No image selected. Selected image is previewed here</Text>
          ) : (
            <HStack>
              {coverImage.map((image) => {
                return <Img key={image.width} height="200px" src={URL.createObjectURL(image)} />;
              })}
            </HStack>
          )}
        </Box>
        <Center>
          <HStack margin="20px" spacing={6}>
            <Button
              width="250px"
              colorScheme="green"
              variant="solid"
              onClick={postForm}
            >
              Submit
            </Button>
            <Button
              onClick={clearForm}
              width="250px"
              colorScheme="red"
              variant="solid"
            >
              Clear
            </Button>
          </HStack>
        </Center>
      </Stack>
    </>
  );
}

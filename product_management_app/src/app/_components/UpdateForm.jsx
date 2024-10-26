"use client";
import {
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Input,
  Textarea,
  Stack,
  HStack,
  Heading,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateForm() {
  const [productName, setName] = useState("");
  const [productDescription, setDesc] = useState("");
  const [productPrice, setPrice] = useState(100);
  const [productQuantity, setQuantity] = useState(1);
  const toast = useToast();
  const params = useParams();
  const productId = params.id;
  const nextRouter = useRouter();
  useEffect(() => {
    try {
      axios.get(`https://product-management-giva.onrender.com/${productId}`).then((response) => {
        const data = response.data;
        console.log(data);
        setName(data.name);
        setDesc(data.description);
        setPrice(data.price);
        setQuantity(data.quantity);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }, []);

  const updateForm = async () => {
    try {
      const response = await axios.put(
        `https://product-management-giva.onrender.com/admin/${productId}`,
        {
          productId,
          productName,
          productDescription,
          productPrice,
          productQuantity,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      toast({
        position: "top",
        description: "Product Details Updated",
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
        <Center>
          <HStack margin="20px" spacing={6}>
            <Button
              width="250px"
              colorScheme="green"
              variant="solid"
              onClick={updateForm}
            >
              Edit
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

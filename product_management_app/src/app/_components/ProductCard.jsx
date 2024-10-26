"use client";
import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function ProductCard({
  name,
  id,
  price,
  cover,
  quantity,
  description,
}) {
  const nextRouter = useRouter();
  const toast = useToast();
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`https://product-management-giva.onrender.com/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "application/x-www-form-urlencoded", // for <input type=file> data
        },
      });
      toast({
        position: "top",
        description: "Product deleted succesfully",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      location.reload();
    } catch (error) {
      toast({
        position: "top",
        description: "Something went wrong. Try again later",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className="border border-text m-1 w-fit h-fit">
      <Card
        width="sm"
        backgroundColor="brand.200"
        variant="filled"
        minW="xs"
        height="420px"
      >
        <CardBody>
          <Image
            height="200px"
            width="350px"
            fit="fill"
            src={cover}
            alt={name}
            borderRadius="sm"
            borderWidth="2px"
            borderStyle="solid"
            borderColor="brand.500"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" color="brand.600">
              {name}
            </Heading>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Text as="b" color="brand.600" fontSize="sm">
                ₹{price}
              </Text>
              <Text as="b" color="brand.600" fontSize="sm">
                Units in stock : {quantity}
              </Text>
            </Stack>
            <Text
              color="brand.600"
              fontSize="sm"
              overflowWrap={"normal"}
              overflowY={"scroll"}
            >
              <b>Description :</b>
              <br />
              {description}
            </Text>
            {typeof window !== 'undefined' && window.localStorage.getItem("token") && (
              <ButtonGroup spacing={3} justifyContent={"center"}>
                <Button
                  size="xs"
                  variant="solid"
                  colorScheme="brand"
                  onClick={() => {
                    nextRouter.push(`/admin/${id}`);
                  }}
                >
                  Edit Details
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="brand"
                  onClick={deleteProduct}
                >
                  Delete Product
                </Button>
              </ButtonGroup>
            )}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

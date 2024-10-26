import { Stack, Heading } from "@chakra-ui/react";
import MainButton from "./MainButton";

export default function Navbar() {
  return (
    <div className="bg-light sticky top-0 z-10 w-full p-3">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Heading fontSize="20px">Product Management App</Heading>
        <MainButton />
      </Stack>
    </div>
  );
}

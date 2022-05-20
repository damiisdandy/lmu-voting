import { Center, Heading } from "@chakra-ui/react";
import Page from "../components/Page";

const FourZeroFour = () => {
  return (
    <Page description="">
      <Center minH="80vh">
        <Heading fontSize={{ base: "100px", md: "200px", lg: "300px" }}>
          404
        </Heading>
      </Center>
    </Page>
  );
};

export default FourZeroFour;

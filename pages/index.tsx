import {
  Box,
  Heading,
  HStack,
  Text,
  Link as ChakraLink,
  useBreakpointValue,
  BoxProps,
  HeadingProps,
  TextProps,
  StackProps,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Page from "../components/Page";
import Button from "../components/Button";
import center from "../assets/images/hero/3.png";
import top from "../assets/images/hero/1.png";
import bottom from "../assets/images/hero/2.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MotionProps, motion } from "framer-motion";
import { useGlobalContext } from "../context";
import Countdown from "react-countdown";
import dayjs from "dayjs";

const MotionBox = motion<MotionProps & BoxProps>(Box);
const MotionHeading = motion<MotionProps & HeadingProps>(Heading);
const MotionText = motion<MotionProps & TextProps>(Text);
const MotionHStack = motion<MotionProps & StackProps>(HStack);

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const variantItem = {
  hidden: { opacity: 0, y: "-20px" },
  show: {
    opacity: 1,
    y: "0",
    transition: {
      type: "ease",
    },
  },
};

const Index: NextPage = () => {
  const btnSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });
  const { push } = useRouter();
  const { state } = useGlobalContext();
  return (
    <Page description="Generated by Create Next Stack.">
      <HStack
        display={{ base: "flex", md: "none" }}
        position="relative"
        h="230px"
        w="100%"
        // mt="6"
      >
        <MotionBox
          animate={{
            opacity: ["0%", "100%"],
            transition: {
              delay: 0.5,
            },
          }}
          position="absolute"
          boxSize={{ base: "24", sm: "32" }}
          zIndex="9"
          borderRadius="full"
          overflow="hidden"
          shadow="lg"
          left="4%"
        >
          <Image
            src={top}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="patient"
          />
        </MotionBox>
        <MotionBox
          animate={{
            scale: [0, 1],
            transition: {
              duration: 0.6,
              type: "spring",
            },
          }}
          border="5px solid black"
          borderColor="brand.100"
          position="absolute"
          boxSize={{ base: "36", sm: "48" }}
          zIndex="10"
          borderRadius="full"
          overflow="hidden"
          shadow="lg"
          left={{
            base: "calc(50% - (var(--chakra-sizes-36)/2))",
            sm: "calc(50% - (var(--chakra-sizes-48)/2))",
          }}
        >
          <Image
            src={center}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="patient"
          />
        </MotionBox>
        <MotionBox
          animate={{
            opacity: ["0%", "100%"],
            transition: {
              delay: 0.5,
            },
          }}
          position="absolute"
          boxSize={{ base: "24", sm: "32" }}
          zIndex="9"
          borderRadius="full"
          overflow="hidden"
          shadow="lg"
          right="4%"
        >
          <Image
            src={bottom}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="patient"
          />
        </MotionBox>
      </HStack>
      <Box
        p={{ base: "2", md: "8", xl: "12" }}
        h={{ base: "auto", md: "80vh" }}
        alignItems="center"
        display="flex"
      >
        <MotionBox
          w="100%"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <MotionHeading
            variants={variantItem}
            textAlign={{ base: "center", md: "left" }}
            fontSize={{
              base: "32px",
              sm: "38px",
              md: "40px",
              xl: "60px",
            }}
          >
            College of Engineering
          </MotionHeading>
          <MotionText
            variants={variantItem}
            px={{ base: "2", md: "0" }}
            w={{ md: "80%", xl: "100%" }}
            textAlign={{ base: "center", md: "left" }}
            fontSize={{
              base: "13px",
              sm: "15px",
              md: "16px",
              xl: "20px",
            }}
          >
            Voting website for the college of engineering.
            <br /> Login, select a category and vote your person of choice.
          </MotionText>
          <MotionHStack
            variants={variantItem}
            justify={{ base: "center", md: "flex-start" }}
            gap={{ base: "6", md: "8", lg: "12" }}
            alignItems="center"
            mt="8"
          >
            {!state.isAuthenticated && (
              <Button onClick={() => push("/login")} size={btnSize}>
                Login
              </Button>
            )}
            <Text
              fontSize={{
                base: "14px",
                sm: "15px",
                md: "16px",
                xl: "20px",
              }}
              sx={{
                "&": {
                  position: "relative",
                  a: {
                    display: "block",
                    "&::after": {
                      position: "absolute",
                      content: "''",
                      height: "2px",
                      width: "100%",
                      left: 0,
                      bottom: "-5px",
                      bgColor: "brand.100",
                    },
                  },
                },
              }}
            >
              <Link href="/categories">View Categories &rarr;</Link>
            </Text>
          </MotionHStack>
          <MotionText
            variants={variantItem}
            fontSize="20px"
            mt="6"
            className="write"
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            Created by{" "}
            <ChakraLink
              className="write"
              href="https://www.damiisdandy.com"
              isExternal
            >
              damiisdandy
            </ChakraLink>{" "}
            &{" "}
            <ChakraLink
              className="write"
              href="https://www.aolamide.com"
              isExternal
            >
              ola.dev
            </ChakraLink>
          </MotionText>
          {state.endDate && (
            <Box mt="2">
              <Countdown
                renderer={({ hours, minutes, seconds, days }) => {
                  return (
                    <Heading
                      textAlign={{ base: "center", md: "left" }}
                      fontSize={{ base: "18px", md: "22px", xl: "30px" }}
                      color="brand.100"
                    >
                      {days} day{days != 1 ? "s" : ""}, {hours} hour
                      {hours != 1 ? "s" : ""}, {minutes} minute
                      {minutes != 1 ? "s" : ""}, {seconds} second
                      {seconds != 1 ? "s" : ""} left
                    </Heading>
                  );
                }}
                date={state.endDate}
              />
            </Box>
          )}
        </MotionBox>
      </Box>
      <MotionBox
        animate={{ x: ["100%", "0%"] }}
        display={{ base: "none", md: "block" }}
        position="fixed"
        zIndex="2"
        top="0"
        right="0"
        bgColor="brand.100"
        h="100vh"
        w="32vw"
      >
        <MotionBox
          animate={{
            scale: [0, 1],
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          position="absolute"
          boxSize={{ md: "40", xl: "36" }}
          borderRadius="full"
          overflow="hidden"
          boxShadow="lg"
          left={{ md: "-20", xl: "-72" }}
          top={{ md: "40", xl: "24" }}
          sx={{
            img: {
              transition: "all 300ms ease",
            },
            "&:hover": {
              img: {
                transform: "scale(1.2)",
              },
            },
          }}
        >
          <Image
            src={top}
            objectFit="cover"
            placeholder="blur"
            layout="fill"
            alt="Samuel"
          />
        </MotionBox>
        <MotionBox
          animate={{
            scale: [0, 1],
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          border="8px solid white"
          borderColor="brand.100"
          position="absolute"
          boxSize={{ md: "56", lg: "64" }}
          borderRadius="full"
          overflow="hidden"
          left={{ md: "-28", lg: "-32" }}
          top="calc(50% - (var(--chakra-sizes-72)/2))"
          sx={{
            img: {
              transition: "all 300ms ease",
            },
            "&:hover": {
              img: {
                transform: "scale(1.2)",
              },
            },
          }}
        >
          <Image
            src={center}
            objectFit="cover"
            placeholder="blur"
            layout="fill"
            alt="Patience"
          />
        </MotionBox>
        <MotionBox
          animate={{
            scale: [0, 1],
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          position="absolute"
          boxSize={{ md: "40", xl: "36" }}
          borderRadius="full"
          overflow="hidden"
          boxShadow="lg"
          left={{ md: "-20", xl: "-72" }}
          bottom={{ md: "56", xl: "24" }}
          sx={{
            img: {
              transition: "all 300ms ease",
            },
            "&:hover": {
              img: {
                transform: "scale(1.2)",
              },
            },
          }}
        >
          <Image
            src={bottom}
            objectFit="cover"
            placeholder="blur"
            layout="fill"
            alt="Patience picture"
          />
        </MotionBox>
      </MotionBox>
    </Page>
  );
};

export default Index;

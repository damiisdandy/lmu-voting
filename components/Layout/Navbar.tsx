import { Box, HStack, IconButton, StackProps, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import logo from "../../assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGlobalContext } from "../../context";
import { motion, MotionProps } from "framer-motion";

const MotionHStack = motion<MotionProps & StackProps>(HStack);

const Navbar = ({
  links,
  toggleSidebar,
}: {
  links: { name: string; url: string }[];
  toggleSidebar: () => void;
}) => {
  const { state } = useGlobalContext();
  const { pathname, push } = useRouter();
  return (
    <MotionHStack
      initial={{ y: "-100%" }}
      animate={{
        y: "0%",
        transition: {
          duration: 0.4,
        },
      }}
      position="relative"
      justifyContent="space-between"
      w="100%"
      zIndex="12"
      px={{ base: "4", md: "8" }}
      py={{ base: "2", md: "4" }}
    >
      <Box
        position="relative"
        h="auto"
        w={{ base: "20", md: "24" }}
        cursor="pointer"
        onClick={() => push("/")}
      >
        <Image src={logo} placeholder="blur" objectFit="cover" alt="COE logo" />
      </Box>
      <HStack
        display={{ base: "none", md: "flex" }}
        gap={{ md: "32", lg: "52", xl: "12" }}
        color="white"
      >
        <HStack gap="12">
          {links.map((el) => (
            <Text
              color={
                pathname === "/" ? { base: "black", xl: "white" } : "black"
              }
              key={el.url}
              sx={{
                a: {
                  fontSize: "17px",
                  fontWeight: "400",
                  position: "relative",
                  "&:hover:after": {
                    width: "100%",
                  },
                  "&::after": {
                    position: "absolute",
                    content: '""',
                    bottom: "-4px",
                    left: 0,
                    backgroundColor:
                      pathname === "/"
                        ? { md: "brand.100", xl: "brand.200" }
                        : "brand.100",
                    height: "2px",
                    width: pathname === el.url ? "100%" : "0",
                    transition: "width 200ms ease",
                  },
                },
              }}
            >
              <Link href={el.url}>{el.name}</Link>
            </Text>
          ))}
        </HStack>
        <Button
          onClick={() => push("/login")}
          display={{ base: "none", md: "flex" }}
          isLight={pathname === "/"}
        >
          Login
        </Button>
      </HStack>
      <IconButton
        onClick={toggleSidebar}
        display={{ base: "flex", md: "none" }}
        icon={<GiHamburgerMenu />}
        aria-label="toggle sidebar"
        _focus={{
          boxShadow: "none",
        }}
        _hover={{
          transform: "scale(1.1)",
        }}
        _active={{
          transform: "scale(0.9)",
        }}
        sx={{
          "&, &:hover, &:active": {
            color: state.isSidebarOpen ? "black" : "white",
            bgColor: state.isSidebarOpen ? "brand.200" : "brand.100",
          },
        }}
      />
    </MotionHStack>
  );
};

export default Navbar;

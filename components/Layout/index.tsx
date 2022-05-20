import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { Box, BoxProps, Center, Text, VStack } from "@chakra-ui/react";
import { useGlobalContext } from "../../context";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import logo from "../../assets/images/logo-full.png";
import Link from "next/link";
import Image from "next/image";

const MotionBox = motion<MotionProps & BoxProps>(Box);

const LINKS: { name: string; url: string }[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Categories",
    url: "/categories",
  },
];

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { state, dispatch } = useGlobalContext();
  const { pathname, push } = useRouter();
  const toggleSidebar = () => {
    dispatch({
      type: "TOGGLE_SIDEBAR",
    });
  };
  return (
    <>
      <Navbar links={LINKS} toggleSidebar={toggleSidebar} />
      <Center
        display={{ base: "flex", md: "none" }}
        position="fixed"
        w="60vw"
        h="100vh"
        bgColor="brand.100"
        transition="right 400ms ease"
        right={state.isSidebarOpen ? "0" : "-100%"}
        top="0"
        zIndex="40"
      >
        <Box h="8" w="28" position="absolute" top="4" left="4">
          <Image
            src={logo}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="College of Engineering"
          />
        </Box>
        <VStack gap="8">
          {LINKS.map((el) => (
            <Text
              color="white"
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
                    backgroundColor: "brand.200",
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
        </VStack>
      </Center>
      {children}
      <AnimatePresence>
        {state.isSidebarOpen && (
          <MotionBox
            display={{ base: "block", md: "none" }}
            onClick={toggleSidebar}
            initial={{ opacity: "0%" }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: "0%" }}
            position="fixed"
            zIndex="30"
            h="100vh"
            w="100vw"
            top="0"
            right="0"
            bgColor="blackAlpha.600"
            border="none"
          ></MotionBox>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;

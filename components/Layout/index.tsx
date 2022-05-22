import { FC, ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  BoxProps,
  Center,
  CenterProps,
  HStack,
  Progress,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../context";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import logo from "../../assets/images/logo-full.png";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import logoOutline from "../../assets/images/logo-border.png";
import axios from "../../services";

const MotionBox = motion<MotionProps & BoxProps>(Box);
const MotionCenter = motion<MotionProps & CenterProps>(Center);

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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toggleSidebar = () => {
    dispatch({
      type: "TOGGLE_SIDEBAR",
    });
  };

  useEffect(() => {
    dispatch({
      type: "CLOSE_SIDEBAR",
    });
  }, [pathname, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/auth/status");
        dispatch({
          type: "SET_IS_AUTH",
          payload: true,
        });
      } catch (err) {
        dispatch({
          type: "SET_IS_AUTH",
          payload: false,
        });
      } finally {
        dispatch({
          type: "SET_LOADER",
          payload: false,
        });
      }
    })();
  }, [dispatch]);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/auth/logout");
      toast({
        status: "warning",
        title: "Successfully logged out",
      });
      dispatch({
        type: "SET_IS_AUTH",
        payload: false,
      });
      push("/");
    } catch {
      toast({
        status: "error",
        title: "Failed to log out",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AnimatePresence>
        {state.loader && (
          <MotionCenter
            animate={{
              y: "0",
            }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.3,
                type: "linear",
              },
            }}
            h="100vh"
            w="100vw"
            bgColor="brand.100"
            position="fixed"
            top="0"
            left="0"
            zIndex="100"
          >
            <VStack>
              <Box w={{ base: "44", md: "56" }} position="relative">
                <Image
                  src={logoOutline}
                  placeholder="blur"
                  alt="College of engineering"
                />
              </Box>
              <Progress
                bgColor="#b3535f"
                w="64"
                isIndeterminate
                size="xs"
                colorScheme="solid"
              />
            </VStack>
          </MotionCenter>
        )}
      </AnimatePresence>
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
        <Button
          onClick={() => push("/login")}
          size="sm"
          isLight
          w="calc(100% - 20px)"
          position="absolute"
          bottom="10px"
          bgColor={state.isAuthenticated ? "brand.300" : ""}
          // @ts-ignore
          color={state.isAuthenticated ? "white" : null}
        >
          {state.isAuthenticated ? "Logout" : "Login"}
        </Button>
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
      <Box key={state.loader + "loader"}>{children}</Box>
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

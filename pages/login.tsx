import {
  VStack,
  Box,
  Heading,
  Text,
  Input,
  BoxProps,
  chakra,
  useToast,
  Center,
} from "@chakra-ui/react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import Button from "../components/Button";
import Page from "../components/Page";
import { useGlobalContext } from "../context";
import axios from "../services";
import Link from "next/link";
import { useCountdown } from "usehooks-ts";

const MotionBox = motion<MotionProps & BoxProps>(Box);

interface LoginFormProps {
  withPasscode?: boolean;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

const LoginForm = ({ withPasscode, register, loading }: LoginFormProps) => {
  return (
    <MotionBox
      p="3"
      key={withPasscode + ""}
      initial={{ y: "50%", opacity: "0" }}
      animate={{ y: "0%", opacity: "1" }}
      exit={{ y: withPasscode ? "50%" : "-50%", opacity: "0" }}
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "15px", md: "18px" }}
        textAlign="center"
        mb="1"
      >
        {withPasscode
          ? "Check your webmail for your passcode"
          : " Type in your registration number"}
      </Text>
      {withPasscode && (
        <Text textAlign="center" mb="2" fontSize="11px" color="#555">
          If you didn&apos;t recieve any mail, please check your <b>spam</b>
        </Text>
      )}
      <VStack w={{ base: "90%", md: "80%" }} m="0 auto" gap="3">
        <Input
          {...register(withPasscode ? "passcode" : "regno")}
          _focus={{
            borderColor: "brand.100",
          }}
          sx={{
            "&::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder":
              { color: "#777" },
          }}
          bgColor="blackAlpha.200"
          _hover={{
            bgColor: "blackAlpha.100",
          }}
          required
          w="100%"
          variant="filled"
          placeholder={withPasscode ? "passcode goes here..." : "e.g 1700119"}
        />
        <Button isLoading={loading} type="submit" w="100%">
          {withPasscode ? "Login" : "Generate passcode"}
        </Button>
      </VStack>
    </MotionBox>
  );
};

const LoginRedirect = () => {
  const [count, { start }] = useCountdown({
    seconds: 5,
    interval: 1000,
    isIncrement: false,
  });
  const { push } = useRouter();
  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (count <= 0) {
      push("/");
    }
  }, [count, push]);
  return (
    <Center h="80vh" p="3">
      <Box textAlign="center">
        <Heading fontSize="40px" color="brand.100">
          You are already logged in
        </Heading>
        <Text
          fontSize="14px"
          sx={{
            a: {
              textDecor: "underline",
            },
          }}
        >
          Redirecting you in {count >= 0 ? count : 0} seconds or redirect{" "}
          <Link href="/">now</Link>
        </Text>
      </Box>
    </Center>
  );
};

const Login = () => {
  const [hasPasscode, setHasPasscode] = useState<boolean>(false);
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const toast = useToast();
  const { dispatch, state } = useGlobalContext();

  const login = async (data: { regno: string; passcode?: string }) => {
    try {
      setLoading(true);
      if (hasPasscode) {
        const resData = await axios.post("/auth/login", {
          regno: data.regno.trim(),
          passcode: data?.passcode?.trim(),
        });
        toast({
          status: "success",
          title: "Logged in successfully",
        });
        dispatch({
          type: "SET_IS_AUTH",
          payload: { status: true, regno: resData.data.data.regno },
        });
        push("/");
      } else {
        const resData = await axios.post("/user/register", {
          regno: data.regno.trim(),
        });
        const mailStatus = resData.data.data.mailStatus.status;
        const email = resData.data.data.user.email;
        if (mailStatus) {
          setHasPasscode(true);
          toast({
            status: "success",
            title: "Email sent",
            description: `Passcode sent to ${email}`,
          });
        } else {
          toast({
            status: "error",
            title: "Problem sending email",
            description: "Please try again!",
          });
        }
      }
    } catch (err) {
      if (hasPasscode) {
        toast({
          status: "error",
          title: "Problem logging in",
          description: "Invalid passcode",
        });
      } else {
        toast({
          status: "error",
          title: "Invalid registration number",
          description: "Please try again!",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page description="Login page">
      {state.isAuthenticated ? (
        <LoginRedirect />
      ) : (
        <VStack
          w="100%"
          h="80vh"
          gap={{ base: "3", md: "5" }}
          justify="center"
          align="center"
        >
          <Heading
            lineHeight="70%"
            textAlign="center"
            fontSize={{ base: "60px", md: "80px" }}
          >
            LOGIN
          </Heading>
          <chakra.form
            w={{ base: "100%", md: "60%", xl: "50%" }}
            // @ts-ignore
            onSubmit={handleSubmit(login)}
          >
            <AnimatePresence>
              <LoginForm
                loading={loading}
                register={register}
                withPasscode={hasPasscode}
              />
            </AnimatePresence>
          </chakra.form>
        </VStack>
      )}
    </Page>
  );
};

export default Login;

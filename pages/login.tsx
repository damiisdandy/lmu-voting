import {
  VStack,
  Box,
  Heading,
  Text,
  Input,
  BoxProps,
  chakra,
} from "@chakra-ui/react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import Button from "../components/Button";
import Page from "../components/Page";

const MotionBox = motion<MotionProps & BoxProps>(Box);

interface LoginFormProps {
  withPasscode?: boolean;
  register: UseFormRegister<FieldValues>;
}

const LoginForm = ({ withPasscode, register }: LoginFormProps) => {
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
        mb="3"
      >
        {withPasscode
          ? "Check your webmail for your passcode"
          : " Type in your registration number"}
      </Text>
      <VStack w={{ base: "90%", md: "80%" }} m="0 auto" gap="3">
        <Input
          {...register(withPasscode ? "passcode" : "email")}
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
        <Button type="submit" w="100%">
          {withPasscode ? "Login" : "Generate passcode"}
        </Button>
      </VStack>
    </MotionBox>
  );
};

const Login = () => {
  const [hasPasscode, setHasPasscode] = useState<boolean>(false);
  const { handleSubmit, register } = useForm();
  const { push } = useRouter();

  const login = async (data: any) => {
    console.log(data);
    if (hasPasscode) {
      setHasPasscode(false);
      push("/");
    } else {
      setHasPasscode(true);
    }
  };
  return (
    <Page description="Login page">
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
          onSubmit={handleSubmit(login)}
        >
          <AnimatePresence>
            <LoginForm register={register} withPasscode={hasPasscode} />
          </AnimatePresence>
        </chakra.form>
      </VStack>
    </Page>
  );
};

export default Login;

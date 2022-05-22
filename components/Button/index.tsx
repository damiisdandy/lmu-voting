import { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  isLight?: boolean;
  children: ReactNode;
}

const Button = ({
  children,
  isLight,
  bgColor,
  color,
  ...rest
}: ButtonProps) => {
  const bgColorSet = bgColor ? bgColor : isLight ? "brand.200" : "brand.100";
  return (
    <ChakraButton
      px="8"
      color={color ? color : isLight ? "black" : "white"}
      bgColor={bgColorSet}
      {...rest}
      variant="solid"
      fontWeight="bold"
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
          bgColor: bgColorSet,
        },
      }}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;

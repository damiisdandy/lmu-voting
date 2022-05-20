import { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  isLight?: boolean;
  children: ReactNode;
}

const Button = ({ children, isLight, ...rest }: ButtonProps) => {
  const bgColor = isLight ? "brand.200" : "brand.100";
  return (
    <ChakraButton
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
        px: "8",
        "&, &:hover, &:active": {
          color: isLight ? "black" : "white",
          bgColor,
        },
      }}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;

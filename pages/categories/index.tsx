import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Grid,
  GridItem,
  GridItemProps,
  GridProps,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../../components/Button";
import Page from "../../components/Page";
import config from "../../config";
import { useGlobalContext } from "../../context";

const MotionGrid = motion<MotionProps & GridProps>(Grid);
const MotionGridItem = motion<MotionProps & GridItemProps>(GridItem);

const QUERY = gql`
  {
    sessionBySlug(slug: "${config.sessionId}") {
      title
      categories {
        id
        name
        slug
        isVoted
        createdAt
        votedFor {
          name
        }
        nominees {
          id
          name
          picture
        }
      }
    }
  }
`;

const ACTIVE_STYLE = {
  bgColor: "brand.100",
  color: "white",
  ".chakra-avatar__excess": {
    color: "white !important",
    borderColor: "brand.200",
  },
  ".avatar": {
    borderColor: "brand.200",
  },
  ".btn": {
    bgColor: "brand.200",
    color: "black",
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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

const Categories = () => {
  const { data, loading, error } = useQuery<{ sessionBySlug: VoteSession }>(
    QUERY
  );
  const { push } = useRouter();

  return (
    <Page description="Categories">
      <Box p={{ base: "4", md: "6" }}>
        <Heading
          mb={{ base: "5", md: "7", xl: "12" }}
          textAlign="center"
          fontSize={{ base: "35px", xl: "60px" }}
        >
          CATEGORIES
        </Heading>
        {loading ? (
          <Center h="60vh">
            <Spinner boxSize="28" color="brand.100" />
          </Center>
        ) : error ? (
          <Center h="60vh">
            <Heading textAlign="center" color="red.500">
              Problem fetching categories 🙁
            </Heading>
          </Center>
        ) : (
          <MotionGrid
            variants={container}
            initial="hidden"
            animate="show"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap="7"
          >
            {/* @ts-ignore */}
            {[...data?.sessionBySlug.categories]
              .sort(
                (a: VoteCategory, b: VoteCategory) =>
                  // @ts-ignore
                  new Date(a.createdAt) - new Date(b.createdAt)
              )
              .map((category: VoteCategory) => (
                <MotionGridItem
                  onClick={() => push(`/categories/${category.slug}`)}
                  variants={variantItem}
                  key={category.id}
                >
                  <Box
                    border="2px solid transparent"
                    borderColor="brand.100"
                    // bgColor="brand.100"
                    borderRadius="md"
                    p={{ base: "3", md: "4" }}
                    cursor="pointer"
                    transition="all 200ms ease"
                    sx={category.isVoted ? ACTIVE_STYLE : {}}
                    _hover={ACTIVE_STYLE}
                  >
                    <Heading
                      mb="4"
                      fontSize={{ base: "25px", md: "27px", lg: "35px" }}
                    >
                      {category.name}
                    </Heading>
                    <HStack justify="space-between">
                      <AvatarGroup
                        spacing="-2"
                        size="sm"
                        max={3}
                        sx={{
                          ".chakra-avatar__excess": {
                            bgColor: "transparent",
                            fontWeight: 900,
                            fontSize: "12px",
                            borderColor: "brand.100",
                            ml: "-5px",
                            color: "black",
                          },
                        }}
                      >
                        {category.nominees.map((nominee) => (
                          <Avatar
                            className="avatar"
                            borderColor="brand.100"
                            key={nominee.id}
                            src={nominee.picture}
                          />
                        ))}
                      </AvatarGroup>
                      <Button className="btn">Browse</Button>
                    </HStack>
                  </Box>
                </MotionGridItem>
              ))}
          </MotionGrid>
        )}
      </Box>
    </Page>
  );
};

export default Categories;

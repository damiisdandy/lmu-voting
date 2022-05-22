import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  GridItem,
  GridItemProps,
  GridProps,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Page from "../../components/Page";
import config from "../../config";

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
    color: "white",
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

const Categories = () => {
  const { data, error, loading } = useQuery<{ sessionBySlug: VoteSession }>(
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
          "loading..."
        ) : error ? (
          "error!"
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
            {data?.sessionBySlug.categories.map((category) => (
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
                  <Heading mb="4" fontSize={{ base: "25px", md: "35px" }}>
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
                          src={config.apiUrl + "/" + nominee.picture}
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

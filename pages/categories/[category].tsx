import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Grid,
  GridItem,
  GridItemProps,
  GridProps,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
  chakra,
  HStack,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import Page from "../../components/Page";
import config from "../../config";
import { useGlobalContext } from "../../context";
import axios from "../../services";

const MotionGrid = motion<MotionProps & GridProps>(Grid);
const MotionGridItem = motion<MotionProps & GridItemProps>(GridItem);

const QUERY = gql`
  {
    sessionBySlug(slug: "${config.sessionId}") {
      categories {
        id
        slug
        name
        isVoted
        createdAt
        votedFor {
          name
          picture
          blurPicture
        }
        nominees {
          id
          name
          department
          picture
          blurPicture
        }
      }
    }
  }
`;

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

const Category = () => {
  const { data, loading, error } = useQuery<{ sessionBySlug: VoteSession }>(
    QUERY
  );
  const [isVoted, setIsVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<VoteNominee>();
  const [voteLoading, setVoteLoading] = useState(false);
  const { state } = useGlobalContext();
  const toast = useToast();
  const { query } = useRouter();

  const category = useMemo<VoteCategory | null | undefined>(() => {
    return data
      ? data.sessionBySlug.categories.find((el) => el.slug === query.category)
      : null;
  }, [data, query.category]);

  const vote = async (nominee: string) => {
    if (!state.isAuthenticated) {
      toast({
        status: "warning",
        title: "You need to login to vote 😬",
        description: "Go to the login page",
      });
    } else {
      try {
        setVoteLoading(true);
        await axios.post("/session/category/vote/create", { nominee });
        setIsVoted(true);
        setVotedFor(category?.nominees.find((el) => el.id === nominee));
        toast({
          status: "success",
          title: "Successfully Voted",
          isClosable: true,
        });
      } catch {
        toast({
          status: "error",
          title: "Error voting",
          description: "Try again later",
        });
      } finally {
        setVoteLoading(false);
      }
    }
  };

  const sortMeandAJ = (a: VoteNominee, b: VoteNominee) => {
    if (
      query.category?.includes("innovative") ||
      query.category?.includes("face")
    ) {
      return a.name.localeCompare(b.name);
    } else return 0;
  };

  return (
    <Page description="Categories">
      <Box p={{ base: "12", md: "6" }}>
        {loading ? (
          <Center h="60vh">
            <Spinner boxSize="28" color="brand.100" />
          </Center>
        ) : error ? (
          <Center h="60vh">
            <Heading textAlign="center" color="red.500">
              Problem fetching category 🙁
            </Heading>
          </Center>
        ) : category?.isVoted || isVoted ? (
          <Center h="60vh">
            <VStack gap="6">
              <Box
                borderRadius="full"
                overflow="hidden"
                position="relative"
                boxSize={{
                  base: "180px",
                  sm: "300px",
                  lg: "400px",
                }}
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
                  src={
                    config.apiUrl +
                    "/" +
                    (category?.votedFor
                      ? category?.votedFor.picture
                      : votedFor?.picture)
                  }
                  placeholder="blur"
                  blurDataURL={
                    config.apiUrl +
                    "/" +
                    (category?.votedFor
                      ? category?.votedFor.blurPicture
                      : votedFor?.blurPicture)
                  }
                  alt={
                    category?.votedFor ? category.votedFor.name : votedFor?.name
                  }
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Heading
                fontSize={{
                  base: "20px",
                  md: "30px",
                }}
                textAlign="center"
              >
                you voted for{" "}
                <chakra.span fontFamily="inherit" color="brand.100">
                  {category?.votedFor ? category.votedFor.name : votedFor?.name}
                </chakra.span>{" "}
                for{" "}
                <chakra.span fontFamily="inherit" color="brand.100">
                  {category?.name}
                </chakra.span>
              </Heading>
            </VStack>
          </Center>
        ) : (
          <>
            <Heading
              mb={{ base: "5", md: "7", xl: "12" }}
              textAlign="center"
              fontSize={{ base: "35px", xl: "60px" }}
            >
              {category?.name}
            </Heading>
            <MotionGrid
              variants={container}
              initial="hidden"
              animate="show"
              justifyContent="center"
              justifyItems="center"
              alignItems="center"
              gap="12"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
            >
              {category?.nominees.sort(sortMeandAJ).map((nominee) => (
                <MotionGridItem
                  variants={variantItem}
                  shadow="md"
                  overflow="hidden"
                  borderRadius="lg"
                  key={nominee.id}
                  bgColor="black"
                  p="2"
                >
                  <Box
                    borderRadius="md"
                    overflow="hidden"
                    position="relative"
                    boxSize={{
                      base: "250px",
                      sm: "300px",
                      lg: "400px",
                    }}
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
                      src={config.apiUrl + "/" + nominee.picture}
                      placeholder="blur"
                      blurDataURL={config.apiUrl + "/" + nominee.blurPicture}
                      alt={nominee.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                  <VStack p="3">
                    <Heading
                      lineHeight="90%"
                      mt="2"
                      color="white"
                      fontSize="24px"
                      textAlign="center"
                    >
                      {nominee.name}
                    </Heading>
                    <Text
                      color="GrayText"
                      textTransform="capitalize"
                      fontSize="16px"
                      textAlign="center"
                    >
                      {nominee.department}
                    </Text>
                    <Button
                      isLoading={voteLoading}
                      onClick={() => vote(nominee.id)}
                      w="80%"
                      isLight
                    >
                      Vote
                    </Button>
                  </VStack>
                </MotionGridItem>
              ))}
            </MotionGrid>
          </>
        )}
      </Box>
    </Page>
  );
};

export default Category;

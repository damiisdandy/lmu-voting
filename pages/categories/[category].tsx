import { useRouter } from "next/router";
import Page from "../../components/Page";

const Category = () => {
  const { query } = useRouter();
  return <Page description="Categories">Categories {query.category}</Page>;
};

export default Category;

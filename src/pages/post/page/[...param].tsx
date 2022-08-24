import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import HomePage from '../../../containers/HomePage';
import { countAllPosts } from '../../../data/posts/count-all-posts';
import { getAllPosts } from '../../../data/posts/get-all-posts';
import { PaginationData } from '../../../domain/posts/pagination';
import { PostData } from '../../../domain/posts/post';

export type PageProps = {
  posts: PostData[];
  category?: string;
  pagination: PaginationData;
};

export default function Page({ posts, category, pagination }: PageProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Carregando ...</div>;
  if (!posts.length) return <div>Página não encontrada ...</div>;

  return <HomePage posts={posts} category={category} pagination={pagination} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page =
    Number(ctx.params.param[0]) < 1 ? 1 : Number(ctx.params.param[0]);
  const category = ctx.params.param[1] || '';

  const postsPerPage = 6;
  const startFrom = (page - 1) * postsPerPage;

  const nextPage = page + 1;
  const previousPage = page - 1;

  const sortQuery = 'sort=id:desc';
  const paginationQuery = `&pagination[start]=${startFrom}&pagination[limit]=${postsPerPage}`;
  const categoryQuery = category
    ? `&filters[category][name][$containsi]=${category}`
    : '';
  const urlQuery = `${sortQuery}${paginationQuery}${categoryQuery}`;

  const posts = await getAllPosts(urlQuery);
  const numberOfPosts = Number(await countAllPosts(categoryQuery));

  const pagination: PaginationData = {
    nextPage,
    numberOfPosts,
    postsPerPage,
    previousPage,
    category,
  };

  return {
    props: { posts, pagination, category },
    revalidate: 600,
  };
};

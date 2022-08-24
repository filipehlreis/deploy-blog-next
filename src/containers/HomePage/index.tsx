import Head from 'next/head';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { MainContainer } from '../../components/MainContainer';
import { Pagination } from '../../components/Pagination';
import { PostCard } from '../../components/PostCard';
import { SITE_NAME } from '../../config/app-config';
import { PaginationData } from '../../domain/posts/pagination';
import { PostData } from '../../domain/posts/post';
import { AllPostLinks, Category, Container } from './styles';

export type HomePageProps = {
  posts: PostData[];
  category?: string;
  pagination?: PaginationData;
};

export default function HomePage({
  posts,
  category,
  pagination,
}: HomePageProps) {
  let titleHomePage = category ? `${category} - ${SITE_NAME}` : `${SITE_NAME}`;
  titleHomePage += pagination?.nextPage
    ? ` - Página ${pagination.nextPage - 1}`
    : '';

  return (
    <>
      <Head>
        <title>{titleHomePage}</title>
        <meta name="description" content="Este é um blog sobre tudo na vida." />
      </Head>
      <Header />
      {category && <Category>Categoria: {category}</Category>}
      <MainContainer>
        <Container>
          {posts.map((post) => (
            <PostCard
              key={post.attributes.slug}
              cover={post.attributes.cover.data.attributes.formats.small.url}
              slug={post.attributes.slug}
              title={post.attributes.title}
            />
          ))}
        </Container>
        <Pagination {...pagination} />
        {!pagination?.nextPage && (
          <Link href="/post/page/[...param]" as="/post/page/1" passHref>
            <AllPostLinks>Ver todos os posts</AllPostLinks>
          </Link>
        )}
      </MainContainer>
      <Footer />
    </>
  );
}

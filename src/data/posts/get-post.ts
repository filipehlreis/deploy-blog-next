import { POST_URL } from '../../config/app-config';
import { PostData } from '../../domain/posts/post';
import { fetchJson } from '../../utils/fetch-json';
import { markdownToHtml } from '../../utils/markdown-to-html';

export const getPost = async (slug: string | string[]): Promise<PostData[]> => {
  const slugsString = Array.isArray(slug) ? slug[0] : slug;
  const url = `${POST_URL}filters[slug][$in]=${slugsString}&populate=*`;
  const jsonPosts = await fetchJson<PostData[]>(url);

  if (!jsonPosts['data'].length) return jsonPosts;

  const content = await markdownToHtml(jsonPosts['data'][0].attributes.content);
  jsonPosts['data'][0].attributes.content = content;
  return jsonPosts['data'];
};

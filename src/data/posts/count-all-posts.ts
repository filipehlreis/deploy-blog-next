import { POSTS_URL } from '../../config/app-config';
import { PostData } from '../../domain/posts/post';
import { fetchJson } from '../../utils/fetch-json';

export const countAllPosts = async (query = ''): Promise<string> => {
  // const url = `${POSTS_URL}?&${query}`; // da aula
  const url = `${POSTS_URL}${query}`;
  const numberOfPosts = await fetchJson<PostData[]>(url);
  return numberOfPosts['meta']['pagination']['total'];
};

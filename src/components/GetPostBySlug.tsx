import axios from 'axios';

export async function GetPostBySlug(slug) {
  const res = await axios.get(
    `/wp/v2/posts?slug=${slug}`
  );
  const post = res.data[0];
  return post;
}

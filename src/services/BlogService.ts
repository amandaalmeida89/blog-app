import { PostResponse } from '../types/Post';

export const BlogService = (blogList: PostResponse[], setBlogList = (_: any) => _) => {
  const offset = 8;
  const pagination = Math.ceil(blogList?.length/ offset);
  const total = blogList?.length;

  const createPost = (post: PostResponse) => {
    blogList.push(post);
    setBlogList([...blogList]);
  };

  const deletePost = (postId: number) => {
    const newList = blogList?.filter(({ id }) => id !== postId);
    setBlogList(newList);
  };

  const getPost = (postId: number) => {
    const post = blogList.filter(({ id })=> id === postId);
    return post[0];
  };

  const getList = (page: number) => {
    const count = (page * offset) - offset;
    const delimiter = count + offset;

    if (page <= pagination) {
      return blogList?.slice(count, delimiter);
    }

    return blogList;
  };

  const updatePost = (postId: number, post: PostResponse) => {
    return blogList.filter(({ id }, index) => {
      if (postId === id) {
        blogList[index] = post;
        setBlogList([...blogList]);
      }
    });
  };

  return { createPost, deletePost, getPost, getList, updatePost, pagination, total };
};

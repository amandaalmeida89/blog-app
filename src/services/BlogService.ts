import { PostResponse } from '../types/Post';
import { texts } from '../texts'

type Args = {
  blogList: PostResponse[];
  setBlogList?: (_: any) => void;
  feedbackMessage?: (message: string) => void;
}

export const BlogService = ({ blogList, setBlogList, feedbackMessage }: Args) => {
  const offset = 8;
  const pagination = Math.ceil(blogList?.length/ offset);

  const createPost = (post: PostResponse) => {
    blogList.push(post);

    if (setBlogList && feedbackMessage) {
      setBlogList([...blogList]);
      feedbackMessage(texts.createSuccess)
    }
  };

  const deletePost = (postId: number) => {
    const newList = blogList?.filter(({ id }) => id !== postId);

    if (setBlogList && feedbackMessage) {
      setBlogList(newList);
      feedbackMessage(texts.deleteSuccess)
    }
  };

  const getPost = (postId: number) => {
    const post = blogList.filter(({ id })=> id === postId);
    return post[0];
  };

  const getList = (page: number) => {
    const count = (page * offset) - offset;
    const delimiter = count + offset;

    blogList.sort((a, b) => {
      const parse = (createdAt: string) => Date.parse(createdAt);
      return parse(b.createdAt) - parse(a.createdAt);
    });

    if (page <= pagination) {
      return blogList?.slice(count, delimiter);
    }

    return blogList;
  };

  const updatePost = (postId: number, post: PostResponse) => {
    return blogList.filter(({ id }, index) => {
      if (postId === id) {
        blogList[index] = post;

        if (setBlogList && feedbackMessage) {
          setBlogList([...blogList]);
          feedbackMessage(texts.updateSuccess)
        }
      }
    });
  };

  return { createPost, deletePost, getPost, getList, updatePost, pagination };
};

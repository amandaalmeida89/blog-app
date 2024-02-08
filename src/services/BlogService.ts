import { PostResponse } from '../types/Post';
import { texts } from '../texts';

type Args = {
  blogList: PostResponse[];
  setBlogList?: (_: any) => void;
  feedbackMessage?: (message: string) => void;
  paginationValue?: (value: number) => void;
}

export const BlogService = ({ blogList, setBlogList, feedbackMessage, paginationValue }: Args) => {
  const offset = 8;

  const pagination = (list: PostResponse[]) => {
    return Math.ceil(list?.length/ offset)
  }

  const createPost = (post: PostResponse) => {
    blogList.push(post);

    if (setBlogList && feedbackMessage) {
      setBlogList([...blogList]);
      feedbackMessage(texts.createSuccess);
    }
  };

  const deletePost = (postId: number) => {
    const newList = blogList?.filter(({ id }) => id !== postId);

    if (setBlogList && feedbackMessage) {
      setBlogList(newList);
      feedbackMessage(texts.deleteSuccess);
    }
  };

  const getPost = (postId: number) => {
    const post = blogList.filter(({ id })=> id === postId);
    return post[0];
  };

  const getList = (page: number, isSearch: boolean, titleName: string) => {
    const count = (page * offset) - offset;
    const delimiter = count + offset;

    const items = isSearch
      ? blogList.filter(({ title }) => title?.startsWith(titleName))
      : blogList

    const paginationNumber = pagination(items)

    if (paginationValue) {
      paginationValue(paginationNumber)
    }

    items.sort((a, b) => {
      const parse = (createdAt: string) => Date.parse(createdAt);
      return parse(b.createdAt) - parse(a.createdAt);
    });

    if (page <= paginationNumber) {
      return items?.slice(count, delimiter);
    }

    return items;
  };

  const updatePost = (postId: number, post: PostResponse) => {
    return blogList.filter(({ id }, index) => {
      if (postId === id) {
        blogList[index] = post;

        if (setBlogList && feedbackMessage) {
          setBlogList([...blogList]);
          feedbackMessage(texts.updateSuccess);
        }
      }
    });
  };

  return {
    createPost,
    deletePost,
    getPost,
    getList,
    updatePost,
  };
};

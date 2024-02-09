import { PostResponse, Feedback, FeedbackArgs } from '../types/Blog';
import { texts } from '../texts';

type Args = {
  blogList: PostResponse[];
  setBlogList?: (_: any) => void;
  feedbackMessage?: FeedbackArgs;
  paginationValue?: (value: number) => void;
}

export const BlogService = ({ blogList, setBlogList, feedbackMessage, paginationValue }: Args) => {
  const offset = 8;

  const pagination = (list: PostResponse[]) => {
    return Math.ceil(list?.length/ offset);
  };

  const sendGlobalFeedback = ({ message, action, isOpen }: Feedback) => {
    if (feedbackMessage) {
      feedbackMessage({ message, action, isOpen });
    }
  };

  const createPost = (post: PostResponse) => {
    blogList.push(post);

    if (setBlogList) {
      setBlogList([...blogList]);
      sendGlobalFeedback({ message: texts.createSuccess, isOpen: true });
    }
  };

  const deletePost = (postId: number) => {
    const newList = blogList?.filter(({ id }) => id !== postId);

    if (setBlogList) {
      setBlogList(newList);
      sendGlobalFeedback({ message: texts.deleteSuccess, isOpen: true });
    }
  };

  const getPost = (postId: number) => {
    const post = blogList.filter(({ id })=> id === postId);
    return post[0];
  };

  const getList = (page: number, titleName: string) => {
    const isSearch = !!titleName;
  
    const count = (page * offset) - offset;
    const delimiter = count + offset;

    const filterByTitle = () => {
      return blogList.filter(({ title }) => {
        const formattedTitleName = titleName?.toLowerCase();
        const formattedTitle = title?.toLowerCase();
        return formattedTitle?.startsWith(formattedTitleName);
      });
    };

    const items = isSearch
      ? filterByTitle()
      : blogList;

    const paginationNumber = pagination(items);

    if (paginationValue) {
      paginationValue(paginationNumber);
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

        if (setBlogList) {
          setBlogList([...blogList]);
          sendGlobalFeedback({ message: texts.updateSuccess, isOpen: true });
        }
      }
    });
  };

  return {
    createPost,
    deletePost,
    getPost,
    getList,
    sendGlobalFeedback,
    updatePost,
  };
};

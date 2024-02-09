import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { PostResponse, Feedback, FeedbackArgs } from '../types/Blog';
import { BlogService } from './BlogService';
import blogAppSeed from '../data/blogAppSeed.json';
import { useLocalStorage } from './useLocalStorage';

type ContextProps = {
  createPost: (post: PostResponse) => void;
  getList: (page: number, titleName: string) => PostResponse[];
  getPost: (postId: number) => PostResponse;
  deletePost: (postId: number) => void;
  sendGlobalFeedback: FeedbackArgs;
  updatePost: (postId: number, post: PostResponse) => void;
  pagination?: number;
  feedback?: Feedback
};

export const Context = createContext<ContextProps>(BlogService({ blogList: blogAppSeed }));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [blogList, setBlogList] = useLocalStorage('blogList', blogAppSeed);
  const [feedback, setFeedback] = useState<Feedback>();
  const [pagination, setPaginationValue] = useState(1);

  const feedbackMessage = ({ message, action, isOpen }: Feedback) => {
    setFeedback({ message, action, isOpen });
  };

  const paginationValue = (value: number) => {
    setPaginationValue(value);
  };

  const {
    createPost,
    deletePost,
    getPost,
    getList,
    sendGlobalFeedback,
    updatePost,
  } = BlogService({ blogList, setBlogList, feedbackMessage, paginationValue });

  const contextValue = {
    createPost,
    deletePost,
    feedback,
    getPost,
    getList,
    pagination,
    sendGlobalFeedback,
    updatePost,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

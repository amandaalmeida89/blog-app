import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { PostResponse } from '../types/Post';
import { BlogService } from './BlogService';
import blogAppSeed from '../data/blogAppSeed.json';
import { useLocalStorage } from './useLocalStorage';

type ContextProps = {
  createPost: (post: PostResponse) => void;
  getList: (page: number, isSearch: boolean, titleName: string) => PostResponse[];
  getPost: (postId: number) => PostResponse;
  deletePost: (postId: number) => void;
  updatePost: (postId: number, post: PostResponse) => void;
  pagination?: number;
  feedback?: string
};

export const Context = createContext<ContextProps>(BlogService({ blogList: blogAppSeed }));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [blogList, setBlogList] = useLocalStorage('blogList', blogAppSeed);
  const [feedback, setFeedback] = useState('');
  const [pagination, setPaginationValue] = useState(1);

  const feedbackMessage = (message: string) => {
    setFeedback(message);
  };

  const paginationValue = (value: number) => {
    setPaginationValue(value);
  };

  const {
    createPost,
    deletePost,
    getPost,
    getList,
    updatePost,
  } = BlogService({ blogList, setBlogList, feedbackMessage, paginationValue });

  const contextValue = {
    createPost,
    deletePost,
    feedback,
    getPost,
    getList,
    pagination,
    updatePost,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

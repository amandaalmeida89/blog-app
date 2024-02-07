import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { PostResponse } from '../types/Post';
import { BlogService } from './BlogService';
import blogAppSeed from '../data/blogAppSeed.json';
import { useLocalStorage } from './useLocalStorage';

type ContextProps = {
  createPost: (post: PostResponse) => void;
  getList: (page: number) => PostResponse[];
  getPost: (postId: number) => PostResponse;
  deletePost: (postId: number) => void;
  updatePost: (postId: number, post: PostResponse) => void;
  pagination: number,
  feedback?: string
};

export const Context = createContext<ContextProps>(BlogService({ blogList: blogAppSeed }));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [blogList, setBlogList] = useLocalStorage('blogList', blogAppSeed);
  const [feedback, setFeedback] = useState('');

  const feedbackMessage = (message: string) => {
    setFeedback(message);
  };

  const { createPost, deletePost, getPost, getList, updatePost, pagination } = BlogService({ blogList, setBlogList, feedbackMessage });

  const contextValue = {
    createPost,
    deletePost,
    getPost,
    getList,
    updatePost,
    pagination,
    feedback
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

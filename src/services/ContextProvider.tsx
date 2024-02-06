import { createContext, PropsWithChildren, useContext } from 'react';
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
  pagination: number
};

export const Context = createContext<ContextProps>(BlogService(blogAppSeed));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [ blogList, setBlogList ] = useLocalStorage('blogList', blogAppSeed);

  const { createPost, deletePost, getPost, getList, updatePost, pagination } = BlogService(blogList, setBlogList);

  const contextValue = {
    createPost,
    deletePost,
    getPost,
    getList,
    updatePost,
    pagination,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

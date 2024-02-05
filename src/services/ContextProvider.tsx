import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { PostResponse } from '../types/Post'
import { BlogService } from './BlogService'
import blogAppSeed from '../data/blogAppSeed.json'
import { useLocalStorage } from "./useLocalStorage";

type ContextProps = {
  getList: (page: number) => PostResponse[];
  getBlog: (blogIndex: number) => PostResponse;
  deleteBlog: (blogIndex: number) => void;
  updateBlog: (blogIndex: number, post: PostResponse) => void;
  pagination: number;
};

export const Context = createContext<ContextProps>(BlogService(blogAppSeed));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [ blogList, setBlogList ] = useLocalStorage('blogList', blogAppSeed)

  const { deleteBlog, getBlog, getList, updateBlog, pagination } = BlogService(blogList, setBlogList);

  const contextValue = {
    deleteBlog,
    getBlog,
    getList,
    updateBlog,
    pagination
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

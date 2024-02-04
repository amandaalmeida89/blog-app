import { createContext, PropsWithChildren, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { PostResponse } from '../types/Post'
import { BlogService } from './BlogService'
import blogAppSeed from '../data/blogAppSeed.json'
import { useLocalStorage } from "./useLocalStorage";

type ContextProps = {
  getList: (page: number) => PostResponse[];
  getBlog: (index: number) => PostResponse;
  pagination: number;
};

export const Context = createContext<ContextProps>(BlogService(blogAppSeed));

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [ blogList, setBlogList ] = useLocalStorage('blogList', blogAppSeed)

  const { getList, getBlog, pagination } = BlogService(blogList);

  const contextValue = {
    getList,
    getBlog,
    pagination
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useBlogContext = () => useContext(Context);

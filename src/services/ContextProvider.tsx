import { createContext, PropsWithChildren } from 'react';
import { PostResponse } from '../types/Post'
import { getBlogInfo } from './services'

type ContextProps = {
  getList: (page: number) => PostResponse[];
  pagination: number
};

export const Context = createContext<ContextProps>(getBlogInfo());

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const { getList, pagination } = getBlogInfo();

  const contextValue = {
    getList,
    pagination
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
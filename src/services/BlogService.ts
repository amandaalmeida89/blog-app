import { PostResponse } from '../types/Post'

export const BlogService = (blogList: PostResponse[]) => {
  const offset = 8;
  const pagination = Math.ceil(blogList?.length/ offset);

  const getList = (page: number) => {
    let count = (page * offset) - offset
    const delimiter = count + offset

    if (page <= pagination) {
      return blogList?.slice(count, delimiter)
    }

    return blogList
  }

  const getBlog = (index: number) => {
    return blogList[index]
  }

  return { getList, getBlog, pagination }
}

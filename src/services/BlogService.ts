import { PostResponse } from '../types/Post'

export const BlogService = (blogList: PostResponse[], setBlogList = (_: any) => {}) => {
  const offset = 8;
  const pagination = Math.ceil(blogList?.length/ offset);

  const deleteBlog = (blogIndex: number) => {
    const newList = blogList?.filter((_, index) => index !== blogIndex)
    setBlogList(newList)
  }

  const getBlog = (blogIndex: number) => {
    return blogList[blogIndex]
  }

  const getList = (page: number) => {
    let count = (page * offset) - offset
    const delimiter = count + offset

    if (page <= pagination) {
      return blogList?.slice(count, delimiter)
    }

    return blogList
  }

  const updateBlog = (blogIndex: number, post: PostResponse) => {
    blogList[blogIndex] = post
    setBlogList([...blogList])
  }

  return { deleteBlog, getBlog, getList, updateBlog, pagination }
}

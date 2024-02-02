import blogAppSeed from '../data/blogAppSeed.json'

const offset = 8;
const pagination = Math.ceil(blogAppSeed.length/ offset);

export const getBlogInfo = () => {
  const getList = (page: number) => {
    let count = (page * offset) - offset
    const delimiter = count + offset

    if (page <= pagination) {
      return blogAppSeed.slice(count, delimiter)
    }
    return blogAppSeed
  }

  return { getList, pagination }
}

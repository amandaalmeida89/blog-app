type Nullable<T> = T | null;

export type PostResponse = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  imgUrl: Nullable<string>
}
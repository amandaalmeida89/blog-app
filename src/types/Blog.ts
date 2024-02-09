type Nullable<T> = T | null;

export type PostResponse = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  imgUrl: Nullable<string>
}

export type FeedbackArgs = ({ message, action, isOpen }: Feedback) => void;

export type Feedback = {
  message: string;
  action?: {
    label?: string;
    trigger: () => void;
  };
  isOpen: boolean
}
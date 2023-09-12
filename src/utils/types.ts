export type postProps = {
  creator: { email: string; id: string; image: string; username: string; _id: string };
  link: string;
  comment: string;
  tag: string;
  _id: string;
};

export type handleTagClickType = (tagName: string) => void;
export type handleEditType = (post: postProps) => void;
export type handleDeleteType = (post: postProps) => void;

export interface PostCardProps {
  post: postProps;
  handleTagClick?: handleTagClickType;
  handleEdit?: handleEditType;
  handleDelete?: handleDeleteType;
}

export type FormProps = {
  type: string;
  post: { tag: string; link: string; comment: string };
  setPost: ({ link, tag, comment }: { tag: string; link: string; comment: string }) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

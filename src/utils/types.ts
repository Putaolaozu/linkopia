export interface postProps {
  creator: { email: string; id: string; image: string; username: string; _id: string };
  prompt: string;
  tag: string;
  _id: string;
}

export type handleTagClickType = (tagName: string) => void;
export type handleEditType = (post: postProps) => void;
export type handleDeleteType = (post: postProps) => void;

export interface PromptCardProps {
  post: postProps;
  handleTagClick?: handleTagClickType;
  handleEdit?: handleEditType;
  handleDelete?: handleDeleteType;
}

export type FormProps = {
  type: string;
  post: { tag: string; prompt: string };
  setPost: ({ prompt, tag }: { prompt: string; tag: string }) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

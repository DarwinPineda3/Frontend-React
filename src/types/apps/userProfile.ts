type ProfileType = {
  id: number | string;
  avatar: string;
  name: string;
  time: string;
};

type Likes = {
  like: boolean;
  value: number;
};

type PostImageType = {
  img: string;
  featured?: boolean;
  title?: string;
};

type CommentDataType = {
  name?: string;
  comment?: string;
  likes?: Likes;
  video?: string;
  replies?: Reply[];
};

type Reply = {
  id?: string | number;
  profile?: ProfileType;
  data: CommentDataType;
};

type Comment = {
  id: string | number;
  profile: ProfileType;
  data?: CommentDataType;
};

type PostDataType = {
  id?: string | number;
  content: string;
  images: PostImageType[];
  video?: string;
  likes: Likes;
  comments?: Comment[];
};

export type PostType = {
  id?: any;
  profile: ProfileType;
  data: PostDataType;
};

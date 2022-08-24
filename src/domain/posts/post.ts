// https://fast-river-12248.herokuapp.com/api/posts?populate=*
export type PostID = number;

export type PostAuthor = {
  data: {
    id: PostID;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};

export type PostCategory = {
  data: {
    id: PostID;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};

export type PostCoverFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type PostCoverImg = {
  data: {
    id: PostID;
    attributes: PostCoverFormat & {
      alternativeText: string;
      caption: string;
      formats: {
        thumbnail: PostCoverFormat;
        small: PostCoverFormat;
        medium: PostCoverFormat;
        large: PostCoverFormat;
      };
      previewUrl: null;
      provider: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type PostData = {
  id: PostID;
  attributes: {
    title: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: PostCoverImg;
    author: PostAuthor;
    category: PostCategory;
  };
};

export type PostApi = {
  data: PostData;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

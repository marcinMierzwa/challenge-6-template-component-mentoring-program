export interface ArticleApi {
    createdAt: string;
    title: string;
    imageUrl: string;
    content: string;
    comments: [
      {
        text: string;
        user: {
          avatar: string;
          name: string;
        }
      }
    ]
    id: number;
   showImage: boolean;
  }
export interface ArticleProps {
  title: string;
  pubDate: string;
  content: string;
  categories: string[];
  author: string;
}

export interface BlogPageProps {
  articles: ArticleProps[];
}

export interface BlogProps {
  articles: ArticleProps[];
}

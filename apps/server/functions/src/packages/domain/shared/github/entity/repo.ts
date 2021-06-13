export type Repo = {
  id: number;
  owner: string;
  name: string;
  private: boolean;
  fork: boolean;
  description: string;
  url: string;
  starCount: number;
}

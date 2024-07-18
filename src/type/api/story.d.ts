export interface StoryData {
  response: Story[];
}

export interface Story {
  id: number;
  sent: string;
  keyword: string[];
  img_url: string[];
}

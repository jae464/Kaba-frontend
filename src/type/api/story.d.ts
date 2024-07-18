export interface StoryData {
  response: Story[];
}

export interface Story {
  id: number;
  sent: string;
  img_url: string[];
}

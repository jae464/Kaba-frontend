export interface Tutorial {
  title: string;
  items: TutorialItem[];
}

export interface TutorialItem {
  img_url: string;
  description: string;
}

export const tutorials: Tutorial[] = [
  {
    title: '인물관계도',
    items: [
      {
        img_url: '/src/assets/images/인물관계도_1.png',
        description:
          '읽은곳까지 소설속 인물관계를 한눈에 파악할 수 있는 기능이에요.\n 오른쪽 위에 메뉴 버튼을 눌러요.',
      },
      {
        img_url: '/src/assets/images/인물관계도_2.png',
        description: '인물 관계도 버튼을 클릭해요.',
      },
      {
        img_url: '/src/assets/images/인물관계도_3.png',
        description: 'KABA가 인물관계도를 그려줄때까지 잠시 기다려요~',
      },
      {
        img_url: '/src/assets/images/인물관계도_4.png',
        description:
          '인물관계도가 완성되었어요! 한눈에 인물관계도를 파악해봐요.',
      },
    ],
  },
  {
    title: '지난줄거리',
    items: [
      {
        img_url: '/src/assets/images/지난줄거리_1.png',
        description: '지난줄거리 설명 1',
      },
      {
        img_url: '/src/assets/images/지난줄거리_2.png',
        description: '지난줄거리 설명 1',
      },
      {
        img_url: '/src/assets/images/지난줄거리_3.png',
        description: '지난줄거리 설명 1',
      },
      {
        img_url: '/src/assets/images/지난줄거리_4.png',
        description: '지난줄거리 설명 1',
      },
    ],
  },
  {
    title: '그림일기',
    items: [
      {
        img_url: '/src/assets/images/그림일기_1.png',
        description: '그림일기 설명 1',
      },
      {
        img_url: '/src/assets/images/그림일기_2.png',
        description: '그림일기 설명 1',
      },
      {
        img_url: '/src/assets/images/그림일기_3.png',
        description: '그림일기 설명 1',
      },
      {
        img_url: '/src/assets/images/그림일기_4.png',
        description: '그림일기 설명 1',
      },
      {
        img_url: '/src/assets/images/그림일기_5.png',
        description: '그림일기 설명 1',
      },
    ],
  },
  {
    title: 'KABA위키',
    items: [
      {
        img_url: '/src/assets/images/카바위키_1.png',
        description: '카바위키 설명 1',
      },
      {
        img_url: '/src/assets/images/카바위키_2.png',
        description: '카바위키 설명 1',
      },
    ],
  },
  {
    title: '등장인물채팅',
    items: [
      {
        img_url: '/src/assets/images/등장인물채팅_1.png',
        description: '등장인물채팅 설명 1',
      },
      {
        img_url: '/src/assets/images/등장인물채팅_2.png',
        description: '등장인물채팅 설명 1',
      },
    ],
  },
];

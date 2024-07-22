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
        description: `등장인물 관계가 너무 복잡해서 이해하기 어려우신적 있으신가요? 그럴때는 "인물관계도" 기능을 사용해봐요!`,
      },
      {
        img_url: '/src/assets/images/인물관계도_2.png',
        description: `먼저 오른쪽 메뉴에서 인물 관계도 버튼을 클릭해요.`,
      },
      {
        img_url: '/src/assets/images/인물관계도_3.png',
        description: 'KABA가 인물관계도를 그려줄때까지 잠시 기다려요.',
      },
      {
        img_url: '/src/assets/images/인물관계도_4.png',
        description:
          '인물관계도가 완성되었어요! 이제 한눈에 인물관계도를 파악해봐요.',
      },
    ],
  },
  {
    title: '등장인물채팅',
    items: [
      {
        img_url: '/src/assets/images/등장인물채팅_1.png',
        description:
          '소설속 등장인물과 대화해보고 싶으신 경험 있으신가요? 그럴때는 "등장인물 채팅" 기능을 이용해보세요!',
      },
      {
        img_url: '/src/assets/images/등장인물채팅_2.png',
        description: '원하는 등장인물을 선택하고 마음껏 대화해보세요.',
      },
    ],
  },
  {
    title: '지난줄거리',
    items: [
      {
        img_url: '/src/assets/images/지난줄거리_1.png',
        description:
          '혹시 읽은곳까지 내용이 기억나지 않으신적 있으신가요? 그럴때는 "지난줄거리" 요약 기능을 이용해보세요!',
      },
      {
        img_url: '/src/assets/images/지난줄거리_2.png',
        description: 'KABA가 읽은곳까지의 줄거리를 그림과 함께 요약해줄거에요.',
      },
      {
        img_url: '/src/assets/images/지난줄거리_3.png',
        description: '폴라로이드 느낌으로 4컷의 그림과 줄거리가 제공돼요.',
      },
      {
        img_url: '/src/assets/images/지난줄거리_4.png',
        description: '더 이상 앞에 내용이 기억안난다고 슬퍼하지 마세요!',
      },
    ],
  },
  {
    title: '그림일기',
    items: [
      {
        img_url: '/src/assets/images/그림일기_1.png',
        description:
          '혹시 책을 읽다가 마음에 드는 문구를 발견했나요? 그럴땐 "그림일기" 기능을 이용해보세요!',
      },
      {
        img_url: '/src/assets/images/그림일기_2.png',
        description: 'KABA가 문구와 어울리는 그림을 만들어줄거에요.',
      },
      {
        img_url: '/src/assets/images/그림일기_3.png',
        description: '원하는 글꼴, 폰트 크기, 폰트 색상도 설정할 수 있어요.',
      },
      {
        img_url: '/src/assets/images/그림일기_4.png',
        description:
          '혹시 그림이 마음에 안들면 그림체를 바꿔서 다시 생성해봐요.',
      },
      {
        img_url: '/src/assets/images/그림일기_5.png',
        description: '그림이 마음에 들면 저장해서 친구와 공유할수 있어요.',
      },
    ],
  },
  {
    title: 'KABA위키',
    items: [
      {
        img_url: '/src/assets/images/카바위키_1.png',
        description:
          '혹시 책을 읽으면서 생소한 단어를 발견하셨나요? 그럴땐 "KABA 위키" 기능을 이용해보세요!',
      },
      {
        img_url: '/src/assets/images/카바위키_2.png',
        description: 'KABA가 책의 내용을 바탕으로 자세하기 설명해줄거에요.',
      },
    ],
  },
];

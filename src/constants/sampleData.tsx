import { BooksData } from '../type/api/book';
import { PersonData } from '../type/api/network';
import { CharacterRelationShip } from '../type/api/relation';
import { WikiData } from '../type/api/wiki';
import { Profile } from '../type/profile';

export const peopleDatas: PersonData = {
  persons: [
    {
      name: '여우',
      connection: 'connection 1',
      group: 'group 1',
    },
    {
      name: '뱀',
      connection: 'connection 2',
      group: 'group 1',
    },
    {
      name: '천문학자',
      connection: 'connection 3',
      group: 'group 2',
    },
    {
      name: '장미',
      connection: 'connection 3',
      group: 'group 2',
    },
  ],
};

export const characterRelations: CharacterRelationShip = {
  mainCharacter: '어린왕자',
  characters: [
    '어른들',
    '사막에서 만난 꼬마',
    '터키 천문학자',
    '소행성 B612의 꽃',
    '어른들 2',
    '사막에서 만난 꼬마 2',
    '터키 천문학자 2',
    '소행성 B612의 꽃 2',
  ],
  relationMap: [
    // { start_character: '나', end_character: '어린 왕자', relationship: '친구' },
    {
      first: '어린왕자',
      second: '어른들',
      relationship: '무관심과 오해',
    },
    {
      first: '어린왕자',
      second: '사막에서 만난 꼬마',
      relationship: '친구',
    },
    {
      first: '어린왕자',
      second: '터키 천문학자',
      relationship: '관련 이야기 등장 인물',
    },
    {
      first: '어린왕자',
      second: '소행성 B612의 꽃',
      relationship: '사랑/돌봄의 대상',
    },
    {
      first: '어린왕자',
      second: '어른들 2',
      relationship: '무관심과 오해',
    },
    {
      first: '어린왕자',
      second: '사막에서 만난 꼬마 2',
      relationship: '친구',
    },
    {
      first: '어린왕자',
      second: '터키 천문학자 2',
      relationship: '관련 이야기 등장 인물',
    },
    {
      first: '어린왕자',
      second: '소행성 B612의 꽃 2',
      relationship: '사랑/돌봄의 대상',
    },
  ],
};

export const books: BooksData = {
  books: [
    {
      id: '1',
      title: '어린왕자',
      author: '생텍쥐베리',
      description: '생텍쥐베리의 소설',
      thumbnail_image: 'public/prince.jpeg',
      file_path: '/src/assets/pdfs/little_prince.pdf',
      is_exist: true,
    },
    {
      id: '2',
      title: '로미오와 줄리엣',
      author: '작가 1',
      description: '고전명작',
      thumbnail_image: '/src/assets/images//romeo.jpg',
      file_path: '/src/assets/pdfs/romeo_and_juliet.pdf',
      is_exist: true,
    },
    // {
    //   id: '3',
    //   title: '이방인',
    //   author: '알베르 카뮈',
    //   description: '알베르 카뮈의 소설',
    //   thumbnail_image: 'public/ebang.jpeg',
    //   file_path: '/src/assets/pdfs/1377342678.pdf',
    //   is_exist: false, // 실제 존재하는 파일인지 여부
    // },
    {
      id: '3',
      title: '감정의 이해',
      author: '작가 1',
      description: '감정에 대한 이해를 돕는 책',
      thumbnail_image: 'public/emotions.jpeg',
      file_path: '/src/assets/pdfs/1377342678.pdf',
      is_exist: false,
    },
    {
      id: '4',
      title: '나미야 잡화점의 기적',
      author: '히가시노 게이고',
      description: '히가시노 게이고의 소설',
      thumbnail_image: 'public/namiya.jpeg',
      file_path: '/src/assets/pdfs/1377342678.pdf',
      is_exist: false,
    },
    {
      id: '5',
      title: '과거에 붙잡힌 사람을 위한 책',
      author: '작가 2',
      description: '과거에 얽매인 사람들을 위한 책',
      thumbnail_image: 'public/ptsd.jpeg',
      file_path: '/src/assets/pdfs/1377342678.pdf',
      is_exist: false,
    },
    // 추가 책 데이터...
  ],
};

export const storyData = {
  response: [
    {
      id: 0,
      img_url: '/src/assets/images/어린 왕자_anime_0.png',
      sent: '주인공은 어릴 때 만난 어른들의 무관심과 이해 부족으로 인해 화가의 꿈을 포기하고 비행기 조종사가 되었다.',
    },
    {
      img_url: '/src/assets/images/어린 왕자_anime_1.png',
      sent: '사막에 불시착한 주인공은 어린 왕자를 만나 그의 별과 꽃, 그리고 그의 여정에 대해 듣게 된다.',
    },
    {
      img_url: '/src/assets/images/어린 왕자_anime_2.png',
      sent: '어린 왕자는 자기 별의 꽃을 사랑했지만 서로의 오해와 복잡한 감정으로 인해 떠나게 되었다.',
    },
    {
      img_url: '/src/assets/images/어린 왕자_anime_3.png',
      sent: '주인공은 어린 왕자의 이야기를 통해 진정한 우정과 사랑의 의미를 배우게 된다.',
    },
  ],
};

export const diaryImages = [
  { picture_url: '/src/assets/images/diary_image_1.png' },
  { picture_url: '/src/assets/images/diary_image_2.png' },
  { picture_url: '/src/assets/images/diary_image_3.png' },
  { picture_url: '/src/assets/images/diary_image_4.png' },
  { picture_url: '/src/assets/images/diary_image_5.png' },
  { picture_url: '/src/assets/images/diary_image_6.png' },
];

export const profilesData_1: Profile[] = [
  {
    imageSrc: '/src/assets/images/profile_prince.jpeg',
    name: '어린 왕자',
    highlight: false,
  },
  {
    imageSrc: '/src/assets/images/profile_fox.png',
    name: '여우',
    highlight: false,
  },
  {
    imageSrc: '/src/assets/images/profile_sneak.png',
    name: '보아뱀',
    highlight: false,
  },
  {
    imageSrc: '/src/assets/images/profile_star.png',
    name: '천문학자',
    highlight: false,
  },
  {
    imageSrc: '/src/assets/images/profile_ceo.png',
    name: '사업가',
    highlight: false,
  },
];

export const profilesData_2: Profile[] = [
  {
    imageSrc: '/src/assets/images/profile_romeo.png',
    name: '로미오',
    highlight: false,
  },
  {
    imageSrc: '/src/assets/images/profile_juliet.png',
    name: '줄리엣',
    highlight: false,
  },
];

export const profilesDatas = [...profilesData_1, ...profilesData_2];

export const wikiData: WikiData = {
  response:
    '보아뱀은 대형 뱀의 일종으로, 주로 아프리카, 아시아, 아메리카의 열대 및 아열대 지역에서 서식합니다. 이 뱀들은 육식성으로, 주로 작은 포유류나 조류를 사냥합니다.',
};

export const sampleChats = [
  '안녕하세요, 어떻게 도와드릴까요?',
  '오늘 날씨는 어때요?',
  '커피 한 잔 하실래요?',
  '영화 보러 가고 싶어요.',
  '무슨 일을 하고 계세요?',
  '좋아하는 음악이 뭐예요?',
  '주말에 뭐 할 계획이에요?',
  '점심 뭐 먹을까요?',
  '도서관 가는 길 좀 알려주세요.',
  '오늘 몇 시에 만날까요?',
];

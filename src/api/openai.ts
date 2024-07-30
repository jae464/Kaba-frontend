import axios from 'axios';
import { PersonData } from '../type/api/network';
import {
  books,
  characterRelations,
  diaryImage,
  diaryImages,
  peopleDatas,
  profilesData_1,
  profilesData_2,
  profilesDatas,
  sampleChats,
  storyData,
  wikiData,
} from '../constants/sampleData';
import { DiaryData } from '../type/api/diary';
import { StoryData } from '../type/api/story';
import { Book, BooksData } from '../type/api/book';
import { WikiData } from '../type/api/wiki';
import { ChatData } from '../type/api/chat';
import { CharacterRelationShip } from '../type/api/relation';
import { MessageRequest } from './request/MessageRequest';
import { Profile } from '../type/profile';

export const BASE_URL = 'https://ai.kaba.team';

axios.defaults.withCredentials = true;

// const baseAPI = axios.create({
//   baseURL: BASE_URL,

//   responseType: 'json',
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// });

// 홈 : 모든 책 파일 가져오기
export function getAllBooksAPI(): Promise<BooksData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 100);
  });
}

// 책리더 : 책 파일 가져오기
export function getBookAPI(bookId: string): Promise<Book> {
  console.log('getBookAPI 요청');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.books[Number(bookId) - 1]);
    }, 100);
  });
}

// 인물관계도 : 인물 관계도 가져오기
export async function getNetworkGraphDataAPI(
  bookId: string,
  startPage: number,
  endPage: number,
): Promise<CharacterRelationShip> {
  console.log('getNetworkGraphDataAPI 요청');
  console.log('endPage : ' + endPage);
  const characterRelationShip = await axios.get(
    `${BASE_URL}/character-map/${bookId}?end_page=${endPage}`,
  );
  console.log('결과 : ' + characterRelationShip);

  return characterRelationShip.data;
}

// 그림일기 : 그림 가져오기
export async function getDiaryPictureAPI(
  bookId: string,
  text: string,
  imageStyle: string, // 그림체?
): Promise<DiaryData> {
  console.log('getDiaryPictureAPI 요청');
  const res = await axios.get(
    `${BASE_URL}/diary-img-url/${bookId}?sentence=${text}&img_style=${imageStyle}`,
  );

  console.log('결과 : ' + res.data);

  return res.data;
}

// 등장인물 대화
export async function getMessageAPI(
  character: string,
  message: string,
): Promise<ChatData> {
  console.log('getMessageAPI 호출');
  const res = await axios.get(
    `${BASE_URL}/ai-chat?character=${character}&question=${message}`,
  );
  console.log(res.data);
  return res.data;
}

// 지난 줄거리
export async function getSummaryAPI(
  bookId: string,
  startPage: number,
  endPage: number,
  imgStyle: string,
): Promise<StoryData> {
  console.log(`getSummaryAPI 요청 endPage : ${endPage}`);
  const res = await axios.get(
    `${BASE_URL}/recap-generator/${bookId}?end_page=${endPage}&img_style=${imgStyle}`,
  );
  console.log(res.data);
  const data = res.data;
  return data;
}

// 카바위키
export async function getWikiAPI(
  bookId: string,
  searchText: string,
): Promise<WikiData> {
  console.log('getWikiAPI 요청');
  const res = await axios.get(
    `${BASE_URL}/kaba-wiki/${bookId}?sentence=${searchText}`,
  );
  console.log(res.data);
  const data = res.data;
  return data;
}

// 등장인물 context 초기화
export async function clearChatHistoryAPI(character: string) {
  console.log('clearChatHistoryAPI 호출');
  const res = await axios.post(
    `${BASE_URL}/ai-chat/clear?character=${character}`,
  );
  console.log(res.data);
}

// 등장인물 대화 with 대화 히스토리
export async function postMessageAPI({
  character,
  messages,
}: MessageRequest): Promise<ChatData> {
  console.log('postMessageAPI 호출');
  const res = await axios.post(`${BASE_URL}/ai-chat`, { character, messages });
  console.log(res.data);
  return res.data;
}

// 등장인물 프로필 가져오기
export async function getCharactersAPI(bookId: number): Promise<Profile[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (bookId === 1) {
        resolve(profilesData_1);
      } else if (bookId === 2) {
        resolve(profilesData_2);
      }
    }, 100);
  });
}

import axios from 'axios';
import { PersonData } from '../type/api/network';
import {
  books,
  diaryImage,
  diaryImages,
  peopleDatas,
  sampleChats,
  storyData,
  wikiData,
} from '../constants/sampleData';
import { DiaryData } from '../type/api/diary';
import { StoryData } from '../type/api/story';
import { Book, BooksData } from '../type/api/book';
import { WikiData } from '../type/api/wiki';
import { ChatData } from '../type/api/chat';

const BASE_URL = '';

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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.books[Number(bookId) - 1]);
    }, 300);
  });
}

// 인물관계도 : 인물 관계도 가져오기
export async function getNetworkGraphDataAPI(
  bookId: string,
  startPage: number,
  endPage: number,
): Promise<PersonData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(peopleDatas);
    }, 1000);
  });
}

// 그림일기 : 그림 가져오기
export async function getDiaryPictureAPI(
  bookId: string,
  text: string,
  theme: string, // 그림체?
): Promise<DiaryData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * diaryImages.length);
      resolve(diaryImages[randomIndex]);
    }, 500);
  });
}

// 등장인물 대화
export async function getMessageAPI(
  bookId: string,
  character: string,
  message: string,
): Promise<ChatData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleChats.length);
      resolve({
        name: character,
        message: sampleChats[randomIndex],
      });
    }, 1000);
  });
}

// 지난 줄거리
export async function getSummaryAPI(
  bookId: string,
  startPage: number,
  endPage: number,
): Promise<StoryData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(storyData);
    }, 1000);
  });
}

// 카바위키
export async function getWikiAPI(
  bookId: string,
  startPage: number,
  endPage: number,
  searchText: string,
): Promise<WikiData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wikiData);
    }, 5000);
  });
}

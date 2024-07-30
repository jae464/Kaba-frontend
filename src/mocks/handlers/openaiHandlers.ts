// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import {
  characterRelations,
  diaryImages,
  sampleChats,
  storyData,
  wikiData,
} from '../../constants/sampleData';
import { BASE_URL } from '../../api/openai';

export const openaiHandlers = [
  http.get(`${BASE_URL}/character-map/:bookId`, async ({ params }) => {
    const { bookId } = params;
    await sleep(3000);
    return HttpResponse.json(characterRelations);
  }),

  http.get(`${BASE_URL}/diary-img-url/:bookId`, async ({ params, request }) => {
    const { bookId } = params;
    const url = new URL(request.url);
    const sentence = url.searchParams.get('sentence');
    const imgStyle = url.searchParams.get('img_style');
    await sleep(3000);
    return HttpResponse.json(diaryImages);
  }),

  http.post(`${BASE_URL}/ai-chat`, async ({ request }) => {
    const randomIndex = Math.floor(Math.random() * sampleChats.length);
    const response = sampleChats[randomIndex];
    await sleep(3000);
    return HttpResponse.json({ response });
  }),

  http.get(
    `${BASE_URL}/recap-generator/:bookId`,
    async ({ params, request }) => {
      const { bookId } = params;
      const url = new URL(request.url);
      const endPage = url.searchParams.get('end_page');
      const imgStyle = url.searchParams.get('img_style');
      await sleep(3000);
      return HttpResponse.json(storyData);
    },
  ),

  http.get(`${BASE_URL}/kaba-wiki/:bookId`, async ({ params, request }) => {
    const { bookId } = params;
    const url = new URL(request.url);
    const sentence = url.searchParams.get('sentence');
    await sleep(3000);
    return HttpResponse.json(wikiData);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

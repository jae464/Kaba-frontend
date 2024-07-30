// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import {
  books,
  characterRelations,
  diaryImages,
  sampleChats,
  storyData,
  wikiData,
  profilesData_1,
  profilesData_2,
} from '../../constants/sampleData';
import { BASE_URL } from '../../api/openai';

export const openaiHandlers = [
  http.get(`${BASE_URL}/character-map/:bookId`, async ({ req, res, ctx }) => {
    console.log('인물관계도 요청');
    await sleep(5000);
    return HttpResponse.json(characterRelations);
  }),

  http.get('/diary-img-url/:bookId', (req, res, ctx) => {
    const { bookId } = req.params;
    const sentence = req.url.searchParams.get('sentence');
    const imgStyle = req.url.searchParams.get('img_style');
    return res(ctx.status(200), ctx.json(diaryImages[bookId]));
  }),

  http.get('/ai-chat', (req, res, ctx) => {
    const character = req.url.searchParams.get('character');
    const question = req.url.searchParams.get('question');
    return res(ctx.status(200), ctx.json(sampleChats[character]));
  }),

  http.get('/recap-generator/:bookId', (req, res, ctx) => {
    const { bookId } = req.params;
    const endPage = req.url.searchParams.get('end_page');
    const imgStyle = req.url.searchParams.get('img_style');
    return res(ctx.status(200), ctx.json(storyData));
  }),

  http.get('/kaba-wiki/:bookId', (req, res, ctx) => {
    const { bookId } = req.params;
    const sentence = req.url.searchParams.get('sentence');
    return res(ctx.status(200), ctx.json(wikiData));
  }),

  http.post('/ai-chat/clear', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Chat history cleared' }));
  }),

  http.post('/ai-chat', (req, res, ctx) => {
    const { character, messages } = req.body;
    return res(ctx.status(200), ctx.json(sampleChats[0]));
  }),

  http.get('/characters/:bookId', (req, res, ctx) => {
    const { bookId } = req.params;
    const data = bookId === '1' ? profilesData_1 : profilesData_2;
    return res(ctx.status(200), ctx.json(data));
  }),

  // Add more handlers as needed
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

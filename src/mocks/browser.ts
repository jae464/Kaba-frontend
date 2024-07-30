import { setupWorker } from 'msw/browser';
import { openaiHandlers } from './handlers/openaiHandlers';

export const worker = setupWorker(...openaiHandlers);

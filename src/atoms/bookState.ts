import { atomFamily } from 'recoil';

export const bookState = atomFamily({
  key: 'bookState',
  default: (id) => ({
    lastReadPage: 1,
  }),
});

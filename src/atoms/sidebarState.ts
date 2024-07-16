import { atom } from 'recoil';

export const selectedItemState = atom({
  key: 'sidebarState',
  default: '/',
});

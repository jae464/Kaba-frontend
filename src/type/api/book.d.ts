export interface BooksData {
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnail_image: string;
  file_path: string;
  is_exist: boolean; // 실제 pdf 파일이 존재하는지 여부
}

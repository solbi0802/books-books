# [북스북스] 책 검색 애플리케이션 제작

### 개발환경
 - React(18.2.0), Typescript(4.9.4), react-router-dom(6.7)
 - http-proxy-middleware(CORS처리를 위해 사용했습니다.), axios
 - ant Design, styled-components

### 실행방법
  ```
  1. git clone books-books
  2. npm install  (패키지 설치)
  4. npm start (로컬 실행)
  ```
  
### 디렉토리 구조
```
📦src
 ┣ 📂api
 ┃ ┣ 📂core (axios 인스턴스 생성)
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜main.ts (책 검색 API)
 ┣ 📂components
 ┃ ┗ 📂common (공통 컴포넌트)
 ┃ ┃ ┣ 📜BookIcon.tsx
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜Navigation.tsx
 ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┗ 📜SearchIcon.tsx
 ┣ 📂constants (API키 값과 같이 변하지 않는 값들 상수화)
 ┃ ┗ 📜index.ts
 ┣ 📂page (찜하기 목록 페이지)
 ┃ ┗ 📜wishList.tsx
 ┣ 📂style
 ┃ ┣ 📜global.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types (타입 선언)
 ┃ ┗ 📜index.ts
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx (메인 페이지/도서 검색 페이지)
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┣ 📜setupProxy.js
 ┗ 📜setupTests.ts
 
 ```
 
 ### 기능 구현
 
 - [x] 도서검색 초기화면
 - [x] 도서검색 전체 검색 기능
 - [x] 도서검색 상세검색 기능
 - [x] 내가 찜한 책 초기화면
 - [ ] 도서검색 - 상세보기 클릭시 accordion 동작 및 도서 상세 정보 ui
 - [ ] 찜하기 기능 -> 하트 버튼 눌렀을 때 로컬스토리지에 책정보가 저장되어야함
 - [ ] 내가 찜한 책 목록 불러오기


### 추가 개발 사항
- 전체검색 후 상세 검색했을때 페이지네이션 동작이 어색한 부분 수정
- react-query를 사용하여 관심사 분리
- 테스트 코드 작성
- 책 목록 리스트(bookListItem) 재사용할 수 있는 코드로 변경

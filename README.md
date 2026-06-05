# Personal Blog

Next.js Server Actions와 MongoDB/Mongoose를 결합하여 안정적인 데이터 파이프라인과 실시간 캐시 갱신을 구현한 풀스택 블로그 프로젝트입니다.

---

## 🔗 Live Demo

👉 ([사이트 바로가기](https://my-blog-pearl-chi.vercel.app/))

---

## 📸 Screenshots

![Main Page](https://my-blog-pearl-chi.vercel.app/public/myblogMainWh.svg)

---

<br>

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- MongoDB & Mongoose
- Tailwind css
- Vercel

<br>

---

<br>

## 📁 Project Structure

<br>

```
my_blog/
├── app/                  # 🌐 Next.js App Router 기반 파일 시스템 라우팅
│   ├── admin/            # 🔒 관리자 전용 글쓰기 페이지 (비밀번호 검증 기반 라우트 보호)
│   ├── blog/             # 블로그 포스트 다이내믹 라우트 (/blog/[slug]) 및 필터링
│   └── guestbook/        # 실시간 방명록 리스트 및 일별 방문자 통계 페이지
├── components/           # 전역 UI 컴포넌트 레이어 (Client Component 최소화 관리)
├── lib/                  # ⚙️ Core 백엔드 서비스 계층
│   ├── db.ts             # Mongoose Connection Pool 싱글톤 인스턴스 관리
│   ├── guestbook.ts      # Server-side 데이터 인출(Fetching) 유틸리티
│   └── visitor.ts        # 세션 기반 방문 카운트 레코드 및 애널리틱스 연산
└── models/               # MongoDB 도큐먼트 유효성 검증을 위한 Mongoose 스키마 계층
    ├── Post.ts           # 게시글 구조 정의 (Slug 고유 제약, 섹션 구조화)
    ├── Comment.ts        # 익명 댓글 구조 정의 (익명 비밀번호 검증 필드 포함)
    └── Guestbook.ts      # 방명록 메시지 구조 정의

```

### "관심사의 분리(Separation of Concerns)"와 "서버·클라이언트 역할의 명확한 경계 선언"을 가장 최우선으로 고려

- Next.js App Router의 특성을 살려, 데이터 패칭이 일어나는 핵심 서버 로직과 통계 비즈니스 코드는 lib/ 폴더에 별도로 격리하여 서버 컴포넌트 내부에서 안전하게 실행되도록 했습니다.

- 반면 상태 관리가 필요한 UI 모듈은 컴포넌트 단위로 쪼개어 클라이언트 영역('use client')으로 명시함으로써, 불필요한 클라이언트 사이드 번들 크기를 줄이고 로딩 성능을 최적화했습니다.

<br>

---

<br>

## ✨ Key Features

<br>

### 1. URL 친화적 다이내믹 라우팅 ([slug])

- 포스트 고유 ID(Mongoose \_id) 대신 글 제목을 안전한 문자열로 가공한 slug 기반의 다이내믹 라우팅을 구축했습니다.
- 검색엔진 최적화(SEO)를 극대화하고 사용자가 인지하기 쉬운 깨끗한 URL 체계를 보장합니다.

<br>
<!-- --- -->

### 2. Server Actions를 통한 Zero-API 데이터 뮤테이션

- REST API 엔드포인트를 따로 파지 않고, 함수 레벨에서 'use server' 지시어를 사용해 폼 데이터를 DB에 직접 삽입·수정·삭제합니다.
- 클라이언트 컴포넌트로 전달되는 JavaScript 번들 크기를 줄이고, 백엔드 로직의 안전한 은닉을 실현했습니다.

<br>
<!-- --- -->

### 3. 무효화 기반 실시간 캐시 갱신 (revalidatePath)

- Server Actions 실행 완료 시점에 맞춰 revalidatePath('/blog') 등의 데이터 캐시 무효화 함수를 호출합니다.
- 브라우저 새로고침 없이도 사용자가 작성한 글, 댓글, 좋아요 수가 화면에 즉각 반영되는 선언적 데이터 동기화를 이뤄냈습니다.

<br>
<!-- --- -->

### 4. 스마트 카테고리 썸네일 매핑

- 사용자가 지정한 카테고리명을 기반으로 정적 이미지(public/thumbnails)를 실시간 자동 매핑합니다.
- 별도 이미지 업로드 없이도 통일감 있고 완성도 높은 피드 UI를 제공합니다.

<br>
<!-- --- -->

### 5. 인터랙티브 플로팅 방명록

- 화면 하단에 숨어있다가 Hover 및 Click 액션에 따라 부드럽게 팝업되는 가변형 폼입니다.
- 본문 영역을 침범하지 않는 효율적인 공간 활용으로 매끄러운 UX를 선사합니다.

<br>

---

<br>

## 🛠 Data Architecture Detail

<br>

### 1. Mongoose Connection Pool 관리 (lib/db.ts)

- Next.js 서버리스 환경에서 불필요하게 무수한 DB 연결이 생성되어 데이터베이스 커넥션이 고갈되는 현상을 방지하고자, 전역 객체(global)를 활용한 싱글톤 패턴으로 Connection을 재사용하도록 설계했습니다.

<br>

### 2. 가변 섹션 결합 및 콘텐츠 포맷팅 (action.ts)

- 글 쓰기 폼에서 넘어오는 동적 필드(subTitle_i, content_i)들을 Server Action 내에서 루프 구조로 파싱한 뒤, 마크다운(Markdown) 명세에 맞는 단일 fullContent 스트링으로 결합하여 Post 컬렉션에 단일 도큐먼트로 적재하는 파이프라인을 구축했습니다.

<br>

---

<br>

## ⚠️ Problems & Solutions

<br>

### 문제 1. 한글 제목 작성 시 슬러그(Slug) 누락 및 DB 에러

#### ❗ Issue

- 기존 문자열 가공 처리 중 replace(/[^\w\s-]/g, '') 방식을 사용해, 한글 제목 포스트를 작성하면 문자가 통째로 유실되어 유니크 슬러그 생성 오류 및 DB 필수값 제약 조건 위반 에러 발생.

#### Solution

- 정규식 패턴 내에 한글 음절 유니코드 범위(\uAC00-\uD7A3)를 명시하여 영문과 한글 제목 모두 안전하고 깨끗한 형태의 하이픈 결합 구조(title-slug)로 변환되도록 해결.

<br>
<!-- --- -->

### 문제 2. Optional 필드로 인한 TypeScript 인덱스 타입 에러 (TS2538)

#### ❗ Issue

- 스키마 구조상 category?: string으로 설정되어 있어, 객체 Key로 참조할 때 컴파일 에러 발생.

#### Solution

- 널 병합 연산자(||)로 예외 처리 및 'default' 폴백 이미지를 적용하여 타입 안정성 및 엑박 방지 해결.

<br>
<!-- --- -->

### 문제 3. 데이터 모델 선언 시 Next.js 핫 리로딩으로 인한 모델 재정의 에러

#### ❗ Issue

- Next.js 개발 서버가 실행되는 동안 소스 코드가 수정될 때마다 Mongoose 모델 컴파일이 중복 실행되어 Cannot overwrite model once compiled 에러 발생.

#### Solution

- models.Post || model('Post', PostSchema) 구조를 채택하여 이미 메모리에 컴파일되어 존재하는 컴포넌트 모델 캐시를 우선 참조하도록 예외 처리.

<br>
<!-- --- -->

### 문제 4. 보호 로직 분리로 안전한 데이터 삭제(익명 비밀번호 검증) 시스템 구현

#### ❗ Issue

- 방명록이나 댓글 삭제 시 클라이언트 측에 평문 암호가 전달되거나 불필요한 유출이 발생할 위험 잔존.

#### Solution

- 데이터 ID와 클라이언트가 입력한 비밀번호를 Server Action으로 직접 전송, 서버 레이어 내에서 DB에 접근해 비밀번호를 매칭하고 findByIdAndDelete를 원자적으로 처리하여 강력한 데이터 접근 보안 확보.

<br>
<!-- --- -->

### 문제 5. Fixed UI 토글 시 발생하는 이벤트 버블링 버그

#### ❗ Issue

- 플로팅 폼 내부의 '접기' 버튼 클릭 시, 클릭 이벤트가 상위 컨테이너로 전파되어 닫히자마자 다시 열리는 현상.

#### Solution

- 내부 버튼 핸들러에 e.stopPropagation()을 적용하여 불필요한 이벤트 흐름을 완벽히 차단.

<br>

---

## 📈 What I Learned

<br>

### 섬세한 UI/UX 제어 능력

- 하드코딩된 수치 대신 calc()와 최신 CSS Grid 명세를 조합하여 완성도 높은 가변 애니메이션을 구현하는 방법을 터득했습니다.

<br>

### 타입 시스템 기반의 안전한 아키텍처

- 서버 컴포넌트와 클라이언트 컴포넌트 간의 데이터 경계면을 다루며, TypeScript를 활용해 사전에 에러를 완벽히 차단하는 견고한 개발 습관을 길렀습니다.
- 기존의 클라이언트 패치 모델(CSR)에서 벗어나, 서버 컴포넌트와 Server Actions 간의 긴밀한 상호작용을 다루며 데이터 동기화 비용을 대폭 아끼는 방법을 체감했습니다.

<br>

### 견고한 백엔드 예외 처리

- 서버리스 환경의 데이터베이스 생명 주기를 깊이 이해하게 되었으며, 데이터 가공 및 트랜잭션 과정에서 발생할 수 있는 스키마 무결성 에러를 TypeScript와 Mongoose 단에서 꼼꼼히 방어하는 코딩 습관을 길렀습니다.

<br>

---

<br>

## 📬 Contact

- Email: yuleehana@gmail.com
- GitHub: (https://github.com/yuleehana)

# 🧑‍💻 SJ Portfolio – 퍼블리셔 & 프론트엔드 지망생 조성주의 포트폴리오
![meta](https://github.com/user-attachments/assets/2515b423-5474-40ed-bf4e-ad5a6f99f3f9)


이 프로젝트는 웹 퍼블리셔이자 프론트엔드 개발자로 성장하고 있는 **조성주(SJ)**의 이력서형 포트폴리오 웹사이트입니다.  
단순한 정적 페이지를 넘어, **GSAP 기반의 인터랙션**, **스크롤 애니메이션**, **반응형 레이아웃** 등 다양한 기술을 활용해 **감각적이고 트렌디한 브랜딩**을 목표로 제작했습니다.

---

## 🙋‍♂️ About Me

- 이름: 조성주
- 희망 포지션: 웹 퍼블리셔 / 프론트엔드 개발 지망
- GitHub: [@oloklkl](https://github.com/oloklkl)
- Email: 76seongju@gmail.com

---

## 🛠️ 사용 기술 스택

- **HTML5**  
- **SCSS**  
- **JavaScript (ES6+)**  
- **GSAP (GreenSock Animation Platform)**  
- **Vanilla JS Intersection Observer**  
- **Responsive Web Design**

## 🎯 주요 섹션

| 섹션 | 설명 |
|------|------|
| **Intro** | 문이 열리는 듯한 애니메이션과 함께 SJ 소개 |
| **About Me** | 간단한 자기소개 및 가치관 |
| **Skills** | 사용 가능 기술을 아이콘+퍼센트 차트로 시각화 |
| **Projects** | bokjak, GUCCI, POPMART 등 실제 작업물 요약 |
| **Contact** | 이메일 등 연락처 및 깃허브 링크 |

## 🎨 포트폴리오 특징

- SPA처럼 부드럽게 이어지는 섹션 구성
- **GSAP 기반 인터랙션**으로 생동감 부여
- PC, 태블릿, 모바일까지 대응하는 반응형 디자인
- **기획 → 디자인 → 퍼블리싱** 전 과정을 직접 수행

## 🔗 프로젝트 링크

> 👉 [바로가기 (GitHub Pages)](https://oloklkl.github.io/sj-Portfolio/pages/)


## 💌 Open Graph

![portfolio-kakao](https://github.com/user-attachments/assets/1ca45bb9-ea46-434b-bd2c-ddc256c9a760)


- meta tags를 통해 Facebook, twitter, linkedin, discord, kakao talk 등 링크를 전달 했을 때 링크에 대한 정보를 볼 수 있도록 구현
  
```html
<!-- index.html -->

    <meta property="og:type" content="website" />
    <meta property="og:title" content="조성주 • sj-Portfolio" />
    <meta property="og:description" content="퍼블리셔 및 프론트엔드 개발 지망생 조성주의 이력서형 포트폴리오 웹사이트입니다." />
    <meta property="og:image" content="https://oloklkl.github.io/sj-Portfolio/resources/images/component/common/meta.png" />
    <meta property="og:url" content="https://oloklkl.github.io/sj-Portfolio/pages/" />
```
---

## 📁 프로젝트 구조
```
sj-Portfolio/
├── .vscode
├── pages
│ ├── layout/
│ ├── ├── header.html
│ └── index.html
├── resources/
│ ├── css/
│ ├── fonts/
│ ├── images/
│ ├── js/
│ └── scss/
└── README.md
```

## 📌 목적

> *"퍼블리셔로서의 감각과, 프론트엔드로서의 성장 가능성을 함께 보여주기 위해 만들었습니다."*

이 웹사이트는 실무에 바로 투입될 수 있는 퍼블리셔의 스킬셋과, 프론트엔드로 확장 가능한 가능성을 함께 표현한 프로젝트입니다.


---

## 🗂️ 부록 – 주요 프로젝트 소개

### 1. 🍕 MR.PIZZA – 브랜드 리뉴얼 & 인터랙티브 웹 구현 (개인 프로젝트)

> 기존 미스터피자 웹사이트를 분석하여 브랜드 이미지와 사용자 경험을 개선하는 방향으로 리뉴얼 제작한 프로젝트

- **기술 스택**: HTML, SCSS, JavaScript, GSAP, Swiper
- **주요 구현 기능**
  - 메뉴 페이지 동적 렌더링 및 **메뉴 상세 모달 인터랙션**
  - **장바구니(LocalStorage 기반)** 및 주문 타입(배달/포장) 로직 구현
  - 로그인 / 회원가입 UI 및 기본 인증 흐름 구현
  - 매장(Store) 페이지 레이아웃 및 정보 구조 설계
  - 모바일 메뉴 및 반응형 레이아웃 구현
- **UI/UX 특징**
  - 네온 컬러와 글로우 효과를 활용한 브랜드 감성 리디자인
  - 메뉴 카드, 모달, CTA 버튼 등 인터랙션 중심 UI 설계
  - 실제 서비스처럼 동작하는 프론트엔드 로직 구현
- **의의**: 단순 퍼블리싱을 넘어 데이터 구조, 사용자 흐름, 상태 관리까지 고려하여 구현한 실전형 프로젝트

👉 https://oloklkl.github.io/mr-pizza/pages/

---

### 2. 🎬 BOKJAK – OTT 서비스 팀 프로젝트

> React 기반의 영화/드라마 스트리밍 플랫폼 제작

- **기술 스택**: React, Redux Toolkit, styled-components, GSAP, Swiper
- **주요 기능**: 콘텐츠 상세 모달, 멤버십 요금제 페이지, 반응형 FAQ, 장르별 콘텐츠 섹션
- **담당 역할**: 홈·서브페이지 UI 구현, 스크롤 애니메이션, 요금제 인터랙션 등
- **특징**: 실제 OTT 플랫폼을 벤치마킹하여 기획, 디자인, 개발 전 과정을 팀원들과 협업

👉 https://bokjak-project.netlify.app/

---

### 3. 💼 GUCCI – 구찌 공식 홈페이지 리디자인 (개인 프로젝트)

> HTML + SCSS + JavaScript 기반의 브랜드 리뉴얼

- **목표**: 고급스럽고 세련된 레이아웃을 유지하면서 웹 접근성과 시각적 완성도 향상
- **주요 기능**: 메인 비주얼, Swiper 추천 상품 섹션, 고정된 메뉴 구조 구현
- **스타일**: Spoqa Han Sans 폰트를 활용한 미니멀하고 고급스러운 디자인

👉 https://oloklkl.github.io/Gucci/pages/

---

### 4. 🛍️ POPMART – 키치한 쇼핑몰 리디자인

> 컬렉터블 장난감 쇼핑몰 ‘팝마트’ 웹사이트를 팀 프로젝트로 제작한 후,  
> 디자인과 인터랙션을 직접 리디자인하여 개인 프로젝트로 다시 구현

- **기술 스택**: HTML, SCSS, JavaScript, GSAP, Swiper
- **주요 기능**: 키비주얼 애니메이션, Hover 이미지 전환, 추천 상품 슬라이드
- **리디자인 포인트**: 키치하고 재기발랄한 분위기 강조 + 콘텐츠 레이아웃 및 인터랙션 정리

🔗 팀 프로젝트 버전: https://popmart-eosin.vercel.app/  
🔗 개인 리뉴얼 버전: https://popmart-project.netlify.app/

---

### 5. ✈️ HANATOUR – 하나투어 공식 홈페이지 리디자인 (개인 프로젝트)

> HTML5 + CSS3 기반으로 하나투어 웹사이트를 현대적인 UI로 재구성

- **목표**: 사용자 편의성 강화 및 트렌디한 레이아웃 구현
- **기술 스택**: HTML5, CSS3, JavaScript
- **주요 구현**
  - GNB / LNB 메뉴 재구성
  - 모바일 반응형 구조 개선
  - 투어 상품 리스트 및 상세 UI 개선
- **특징**: 실제 웹사이트 구조를 분석하고 퍼블리셔 관점에서 사용성과 스타일을 개선한 개인 프로젝트

👉 https://oloklkl.github.io/Hanatour/pages/

📌 각 프로젝트는 기획부터 디자인, 개발까지 전 과정을 직접 경험하며 제작한 결과물입니다.


## ⏰ 커밋 히스토리

[내 커밋 히스토리 보러가기](https://github.com/oloklkl/sj-Portfolio/commits/main/)




## 📌 기타
 
-  **해당 포트폴리오는 면접 및 채용을 위한 포트폴리오 용도로 제작되었습니다.**

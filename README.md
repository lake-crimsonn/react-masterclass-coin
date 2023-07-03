# 5.0 setup

```
React Query, React Router 설치
npm i react-router-dom@5.3.0 react-query
npm i --save-dev @types/react-router-dom
(2022.02기준 React Router 6버전으로 진행시 @types/react-router-dom를 설치하지 않아도 타입을 불러옵니다.)

react-router-dom@5.3.0이 아닌 그냥 react-router-dom으로 설치하게 되면 현재 기준으로 6버전이 설치되고, 바뀐 6버전 문법으로 진행하셔야 합니다.
ex) < Route path="/" element={< Coins / >} />

React Router 5 -> 6에서 바뀐 점
Switch컴포넌트 -> Routes컴포넌트로 변경
exact삭제
useHistory -> useNavigate
useRoutes 등

CoinPaprika
https://api.coinpaprika.com/#tag/Tickers

React Query
https://react-query.tanstack.com

새 프로젝트 셋업
npx create-react-app@5.0.0 react-masterclass-course --template typescript
```

---

# 5.1 styles

- 스타일 컴포넌트는 css설정을 컴포넌트 하나에 고정시킨다. 그래서 도큐먼트 전체에 적용하려면 styled-component의 createGlobalStyle를 이용해야 한다.
- html 도큐먼트의 디폴트 css를 수정하는 방법은 ResetCSS를 사용하면 된다. a태그는 디폴트로 언더라인이 깔리지만, 언더라인이 없도록 변경할 수 있게 된다. `npm -i styled-reset`
- ResetCSS는 너무 간단한 파일 하나라서 그냥 복사해서 사용할 수 있다. createGlobalStyle안에 css를 복사하면 된다.
- 컴포넌트를 리턴시킬 때는 하나의 요소만 리턴할 수 있다. 그래서 보통 div로 감싸는 편인데, 이러면 쓸데 없는 div가 많이 늘어나게 된다. `div`대신 고스트 컴포넌트인 빈태그를 이용하면 된다.`<>`

  ```typescript
  <><GlobalStyle/><Router/><>
  ```

- 구글폰트에서 새로운 폰트를 @Import로 가져다 쓰자. 임포트를 해야 새로운 폰트패밀리를 사용할 수 있다.

- [Reset CSS](https://github.com/zacanger/styled-reset/blob/master/src/index.ts)
- [google font](https://fonts.google.com)
- [Flat UI Color](https://flatuicolors.com/palette/gb)
- [createGlobalStyle](https://styled-components.com/docs/api#createglobalstyle)

---

# 5.0 setup

- npm i react-router-dom@5.3.0 react-query
- npm i --save-dev @types/react-router-dom
- api 서버 CoinPaprika
- https://api.coinpaprika.com/#tag/Tickers

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

# 5.2 Home part One

- a태그를 이용한 리스트를 만들면 페이지가 새로고침이 되어버린다. 리액트라우터돔의 `Link`를 이용하면 새로고침 없이 페이지를 이동할 수 있다. 링크는 사실상 a태그를 만드는 건데 리액트라우터돔이 새로고침이 되지 않게 도와준다. 그래서 hover 기능을 추가할 때, a태그의 css를 설정하는 스테이트먼트를 추가해줘야 한다.

- a태그 텍스트의 색상은 디폴트로 파란색이지만 기본 텍스트 색상과 동일하게 만들 수 있다. App컴포넌트에서 a태그의 color를 `inherit`으로 설정하면 된다. 부모와 같은 색상을 사용하겠다는 뜻이다.
- a태그의 영역은 패딩이 늘어난 리스트의 크기와 동일하지 않다. 그래서 마우스를 리스트 위에 올려보면 마우스 화살표가 손가락으로 변경되지 않는다. a태그의 display를 `block`으로 설정해주자. 리스트의 오른쪽 화면 끝까지 블록으로 설정된다. `padding` 역시 추가해줘서 선택영역을 늘리자.
- a태그의 `transition`을 color 0.2s ease-in으로 설정해줘서 디테일을 살려보자. 마우스를 호버했을 때 색상이 변경이 되는 것 같아서, a:hover 스테이트먼트 안에서 해결하는 듯 보이지만 아니다. 호버가 아니라 a태그에 직접 transition을 적용하자.
- 컨테이너 컴포넌트에 `margin` 0 auto; `max-width`를 추가하자. 화면이 커져도 가운데에 리스트가 고정이 되어 있다.

---

# 5.3 Home part Two

- api를 가져올 때 fetch보다 axios가 더 편하다. fetch는 json으로 변환해줘야 하지만, axios은 기본적으로 json으로 가져온다.
- ```javascript
  const getCoins = async () => {
    const res = await axios("https://api.coinpaprika.com/v1/coins");
    setCoins(res.data.slice(0, 100));
    setLoading(false);
  };
  ```
- api에서 오는 데이터 역시 어떤 타입인지 설명해주는 인터페이스가 있어야 한다.
- array에 대한 인터페이스를 적용할 때는 `useState<CoinInterface[]>([]);` 이렇게 사용한다.
- `()()` 함수는 바로 실행할 수 있는 함수인데, 일반적인 함수의 모형을 생각하면 어렵지 않게 이해할 수 있다. useState() -> (useState)() 이렇게 말이다.

- ```javascript
    useState(() => {}, []); // useState는 이렇게 생겼다
    useState((=>{
      ()() // 함수를 따로 만들지 않고 바로 실행할 수 있는 함수
    },[]));
    useState((=>{
      (async ()=>{
        const response = await fectch('https://url');
        const json = await response.json();
        setCoins(json.slice(0,100)); // 100개 짤라오기
      })();
    },[]));
  ```

---

# 5.4 Router States

- [Crpyto Icon API](https://coinicons-api.vercel.app/)
- `` <img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/> ``
- `https://cryptocurrencyliveprices.com/img/${coin.id}.png`
- `https://static.coinpaprika.com/coin/${coin.id}/logo.png`
- a태그의 display가 flex면 block 속성을 제거해야 텍스트가 가운데 정렬을 한다.

---

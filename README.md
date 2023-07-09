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
- 링크태그를 이용하면 새로고침을 하지 않고 페이지에 데이터를 보내고 받을 수 있다. 브라우저에 이미 있는 데이터를 넘겨주면 된다. 다시 api 호출을 통해서 데이터를 가져오지 말자.
- 링크태그를 이용해서 스테이트를 url이 아닌 비하인드씬으로 보낸다.

- ```javascript
  <Link to={`/${c.id}`}> # 기존
  <Link to={{
    pathname: `${c.id}`,
    state: {
      name: c.name
    }
  }}>
  ```
- 스테이트를 수신할 때는 `useLocation`를 통해서 받아야 한다.
- 스테이트를 비하인드 더 씬으로 주고 받을 경우 문제는 무조건 스테이트를 보낸 곳에서 페이지를 시작해야 한다. 페이지에 접속할 때, 꼭 홈을 거치고 페이지를 열어야 한다. url를 통해서 바로 다이렉트로 접근하면 스테이트를 받아올 수 없어서 오류가 난다.
- 오류페이지를 방지하는 방법: `{state?.name || "not available"}`
- state가 존재하면 name을 불러와줘. state가 존재하지 않으면 error를 던지지 말고 undefined를 보여줘.
- state?.name이 null, undefined, empty string이면 "not available"을 보여줘

---

# 5.5 Coin Data

- [coin api](https://api.coinpaprika.com/v1/coins/btc-bitcoin)
- [coin ticker api](https://api.coinpaprika.com/v1/tickers/btc-bitcoin)

---

# 5.6 Data Types

- api로 받아온 json의 타입 편리하게 정해주는 방법

1. 브라우저 콘솔에서 json을 출력한다.
2. 오른쪽 마우스를 클릭하고 `store object as global variable`클릭
3. 콘솔창 프롬프트에 `Object.keys(temp1).join()` 입력. 하나의 문자열로 만들고 복사해서 가져온다.
4. ctrl+d 연타해서 쉼표 전부다 지우고 엔터.
5. `Object.values(temp1).map(c=>typeof(c)).join()` 밸류 가져오기
6. ctrl+shift+L 혹은 ctrl+alt로 커서 길게 만든 다음 end버튼으로 커서를 문자 끝으로 보내주고 밸류 잘라 붙여넣어주기.

- 가져온 타입이 배열인 경우
- 따로 인터페이스를 만들어주고 타입을 지정해준다.
- `tags: ITags[];` 대괄호를 잊지 말아야한다.
- json안에 배열도 있지만, 변수안에 다른 딕셔너리가 있다. `quotes.USD`

---

# 5.7 Nested Routes part One

- [Nested React Router V6 Guide](https://ui.dev/react-router-nested-routes)
- useEffect를 이용하는 경우 보통 마지막 [] 어레이어 변수를 넣어준다. 웹페이지의 성능을 때문에 변수의 스테이트가 변경할 때만 리렌더링 하도록 설정하기 위해서다. 하지만 이번 케이스는 항상 url에 변수를 받아오기 때문에 변수의 스테이트가 변경되지 않으니, 어레이를 비워두어도 괜찮다. 어레이가 비어 있는 걸 no dependency라고 한다.

- ```typescript
  <Title>
    {state?.name ? state.name : loading ? "Loading..." : info?.name}
  </Title>
  ```

- state가 존재하면 name을 보여줘. 존재하지 않으면 undefined를 보여줘. state가 존재하고, name에 값이 존재한다면, state.name을 보여줘.
- state.name이 없다면 loading을 보여줘. loading이 true면 "Loading..."를 보여줘. loading이 false면 info?.name을 보여줘. info가 존재하면 name을 보여줘. info가 없으면 undefined를 보여줘.
- `NestedRoute`: 라우트안에 있는 라우트. 다른 도메인으로 요청을 보냈지만 화면이 변경되지 않고, 같은 화면에서 응답하는 방법.
- App 컴포넌트는 Router 컴포넌트를 이미 포함하고 있다. Router 컴포넌트는 Coin 컴포넌트를 포함하고 있다. Coin 컴포넌트에 새로운 Route태그를 가지게 된다. 한마디로 라우트안에 라우트.

---

# 5.8 Nested Routes part Two

- 네스티트 라우트를 이용하기 때문에 URL을 통해서 화면의 일정 부분이 리렌더링이 된다. URL을 이용하는 태그는 anchor인데, 리액트를 이용하니 Link태그를 이용해서 화면을 리렌더링하게 된다.
- `useRouteMatch`은 특정한 URL를 선택하면 오브젝트를 받아 오는 후크다.
- `const chartMatch = useRouteMatch("/:coinId/chart");` /:coinId/chart라는 텍스트가 URL에 존재하면 링크태그에 있는 오브젝트를 보여준다. useParams는 이전 페이지의 링크태그에서 보내주는 pathname를 통해 URL에 있는 텍스트를 받아온다. useLocation은 이전 페이지의 스테이트를 받아와서 리프레쉬를 막아주면서 UX을 지켜준다.
- ```typescript
  const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
      display: block;
    }
  `;

  <Tab isActive={priceMatch !== null}>
    <Link to={`/${coinId}/price`}>Price Detail</Link>
  </Tab>;
  ```

- isActive의 boolean을 통해서 태그를 활성화할 수 있다. priceMatch(useRouteMatch 후크의 변수)에 오브젝트가 존재해서 true를 반환하고 탭이 활성화된다. useRouteMatch를 이용하지 않으면 null을 반환한다.

---

# 5.9 React Query part One

- npm i react-query

- ```typescript
  import { QueryClient, QueryClientProvider } from "react-query";
  const queryClinet = new QueryClient()
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>...</ThemeProvider>
  </QueryClientProvider>
  ```

- 리액트쿼리는 코인에 대한 api를 받아오는 것부터 로딩까지 이르는 과정을 자동으로 처리해준다.
- fetcher함수는 컴포넌트에서 fetch코드를 분리해 놓은 파일이다. fetcher는 fetch promise를 꼭 리턴해줘야 한다. 프로미스를 이용하면 리턴 스테이트먼트에 한줄로 남길 수 있어서 async-await의 옛방식이라도 유용하다.

- ```typescript
  const { isLoading, data } = useQuery<CoinInterface[]>(
    ["allCoins"],
    fetchCoins
  );
  // "allCoins"는 쿼리의 고유식별자
  // fetchCoins는 fetcher함수
  ```

- api를 받아오는 중인 상태라면 리액트쿼리가 false를 반환해서 로딩 상태다. api를 성공적으로 받아오면 true를 반환해서 api 데이터가 담긴 data를 사용할 수 있게 된다.
- 리액트쿼리는 데이터를 캐시에 저장해두기 때문에 데이터를 파괴하지 않고 유지해준다.

---

# 5.10 React Query part Two

- ```typescript
  import { ReactQueryDevtools } from "react-query/devtools";
  <ReactQueryDevtools initialIsOpen={true} />;
  ```
- 리액트쿼리의 `Devtools`을 이용하면 캐시에 저장해둔 데이터를 확인할 수 있다.

```typescript
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
  ["info", coinId],
  () => fetchCoinInfo(coinId)
);
const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  ["tickers", coinId],
  () => fetchCoinTickers(coinId)
);
```

- `queryHash: "[\"allCoins\"]"` 쿼리해시가 배열을 받기 때문에 `["tickers",coinId]처럼 배열을 보낼 수 있다. 타입스크립트는 이름이 중복되는 걸 매우 싫어하는데, 같은 이름의 coinId가 보내지니 구별을 하기 위해, 앞에 "info","tickers"를 붙여서 함께 보내야 한다.
- `{isLoading,data}` 역시 위아래 스테이트먼트가 중복이 되니까 `: infoLoading, : tickersLoading` 구분을 해준다.
- [구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- 콜백개념

  ```
  Q: 혹시 이 영상에서 reactQuery 쓸때
  useQuery(["info",coinId], ()=>fetchCoinInfo(coinId)) 이 코드에서
  왜 ()=>fetchCoinInfo(coinId) 이런 방식으로 써야하는지 아시는분 계신가요?
  그냥 fetchCoinInfo(coinId) 만 쓰면 오류가 나더라고요 ㅠ

  A: 첫번째: Coins.tsx의 fetchCoins 에는 뒤에 ()가 붙지 않습니다.
  두번째 : Coin.tsx 의 () => fetchfunction(argument) 는 함수 뒤에 ()가 있고 그안에 인자가 들어가지만 앞에서 () => 를 표현하여 주었으므로 일종의 함수 포장지 입니다.

  정리 : useQuery 의 두번째 인자로는 함수가 들어가야 하지 함수의 실행값이 들어가서는 안됩니다. 함수의 뒤에 ()를 붙이는것은 함수를 실행하겠다는 의미이고, ()를 붙이지 않는것은 함수의 실행권한을 이벤트에게 넘기겠다는 말과 같습니다.

  영상에서는 함수 뒤에 인자를 넣어주어야 하는데 함수에 괄호를 열고 바로 인자를 집어넣으면 함수를 전달하는 모양이 아닌 함수를 실행하여 리턴된 값을 전달하게 되므로 기대하지 않은 파라미터를 넘기는것과 같습니다. 그렇기 때문에 () => 를 써서 함수안에 집어넣은 모양을 만들어 주는것입니다.
  ```

- `()=>fetchCoinInfo(coinId)` ()=> 어나니머스함수는 fecthCoinfo함수를 실행시키는 함수. 이렇게 포장지를 감싸줘야 함수 자체를 파라미터로 넘길 수 있다. Coins.tsx의 useQuery("allCoins", fetchCoins);는 함수 실행 권한을 이벤트에게 넘긴다. 함수 자체를 인자로 넘긴다는 말이다. 만약에 fetchCoins()로 파라미터를 넘긴다면, fetchCoins()가 실행이 되고 그 리턴값이 파라미터가 된다.
- `()=>fetchCoinInfo(coinId)`는 coinId를 fetchCoinInfo의 인자로 넘겨야 하기 때문에, ()를 넣어줘야 하고, ()를 넣는다는 건 함수를 실행시킨다는 뜻이다. 함수가 실행이 되면 리턴된 프로미스가 파라미터로 넘어간다. 그러면 안된다. 이 함수는 콜백함수로써 api를 다 받아온 뒤에 실행이 되어야 하기 때문에 함수의 실행 권한을 이벤트가 가지고 있어야 한다. 그래서 이 함수를 실행시키는 함수를 파라미터로 넘긴다.

* 데브툴스는 개발환경에서만 실행이 되며, 프로덕션 빌드 중에 제외가 된다.
* stale은 최신화가 필요한 데이터를 의미한다. stale상태는 데이터를 리프레시 해야한다. [참고 블로그](https://2ham-s.tistory.com/407)

---

# 5.11 Recap

- nothing to note

---

# 5.12 Price Chart

- ohlcv 새 주소
  https://ohlcv-api.nomadcoders.workers.dev
- Math.floor(1.9) -> 1
- Math.ceil(1.9) -> 2

- ```typescript
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2; // 7일 계
  ```

- ```typescript
  // api.ts
  export function fetchCoinHistory(coinId: string) {
    return fetch(`${OHLVC_URL}?coinId=${coinId}`).then((response) =>
      response.json()
    );
  }

  //Coin.tsx
  <Route path={`/${coinId}/chart`}>
    <Chart coinId={coinId} />
  </Route>;

  //Chart.tsx
  function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
      fetchCoinHistory(coinId)
    );
    return <h1>Chart</h1>;
  }
  ```

---

# 5.13 Price Chart part Two

- APEXCHARTS
- `npm install --save react-apexcharts apexcharts`

  ```typescript
  import ApexChart from "react-apexcharts";
  ```

- api에서 price.close이 문자열이라서 생기는 문제가 있다. 형변환을 통해서 문제를 해결.

  ```typescript
  series={[
    {
      name: "sales",
      data: data?.map((price) => price.close) as number[],
    },
  ]}
  ```

- ??[]는 데이터가 null이 되는 걸 방지하는 코드다. null 대신 빈 배열로 바꿔준다.

  ```typescript
  series={[
    {
      name: "sales",
      data: data?.map((price) => parseFloat(price.close)) ?? [],
    },
  ]}

  ```

- ApexChart 사용하는 방법

  ```typescript
  <ApexChart
    type="line"
    series={[
      {
        name: "price",
        data: data?.map((price) => price.close) as number[],
      },
    ]}
    options={{
      theme: { mode: "dark" },
      chart: {
        height: 200,
        width: 500,
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: { show: false },
        axisTicks: { show: false },
      },
    }}
  />
  ```

---

# 5.14 Price Chart part Three

- 유닉스 시간 바꾸기
  ```typescript
  categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
  ```

---

# 5.15 Final Touches

- 5초 마다 갱신하기
- ```typescript
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  ```
- react-helmet
- `npm i react-helmet`
- `npm i --save-dev @types/react-helmet`
- `npm i react-helmet-async`

- 헬멧을 이용해서 html의 head에 대한 정보를 바꿀 수 있다.

```typescript
import { HelmetProvider } from "react-helmet-async";
// App
<HelmetProvider>
  <Router />
</HelmetProvider>

// Coin
<Helmet>
  <title>
    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
  </title>
</Helmet>

```

---

# 5.16 Conclusion

- github.io 배포할 때 주의사항

  ```
  BrowserRouter로 하는 방법-
  우리가 프로젝트중인 폴더를 기준으로
  Router.tsx 파일에서
  BrowserRouter> 이 부분을
  BrowserRouter basename={process.env.PUBLIC_URL}>
  이렇게 수정해주시면 됩니다. (앞에 < 넣으세요)

  이것을 설정을 안 해주면
  라우터가 가리키는 "/"의 경로는 “https://닉네임.github.io/” 주소뒤에 오는 "/"의 경로입니다.
  하지만 여러분의 프로젝트 설정 경로는 “https://닉네임.github.io/리포지터리이름/”에 있기때문에
  빈 화면만 뜨는 것 입니다.
  예를 들어 우리의 깃허브 닉네임이 potato 이고 리포지터리 이름을 master-class라고했다면

  우리는 https://potato.github.io/master-class/ 여기에 경로가 설정되도록 만들었습니다.
  하지만 deploy를 하고 난뒤에 라우터가 가리키는 "/"의 경로는 https://potato.github.io/ 입니다.
  이 잘못된 경로를 수정하기 위해 BrowserRouter basename={process.env.PUBLIC_URL}> 을
  해주면 우리가 처음 의도했던 경로로 이동합니다.
  여기서 PUBLIC_URL은 package.json의 homepage URL값으로 설정이 됩니다.
  참고링크:https://create-react-app.dev/docs/advanced-configuration/
  ```

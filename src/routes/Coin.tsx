import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 36px;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 260px;
  margin: 0 auto;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface InfoData {}

function Coin() {
  //   const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>({});

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      setInfo(infoData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "not available"}</Title>
      </Header>
      {loading ? <Loader>" Loading... "</Loader> : null}
    </Container>
  );
}

export default Coin;

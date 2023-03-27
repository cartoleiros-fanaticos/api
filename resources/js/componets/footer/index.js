import React from 'react';

import { 
  Container
 } from './styles';

function footer() {
  return (
    <Container>
      <Content>
        <Item>
          <Title>SITEMAP</Title>
          <Link to="/videos">Video Dícas</Link>
          <Link to="/escalacao">Escalação Free</Link>
          <Link to="/escalacao">Escalação Plus</Link>
          <Link to="/estatisticas/cruzamentos">Análise</Link>
          <Link href="javascript:void(0)">Desempenho</Link>
          <Link href="javascript:void(0)">Manifesto Cartoleiro</Link>
          <Link href="javascript:void(0)">Liga Cartoleiro</Link>
          <Link href="javascript:void(0)">Hall da fama - Top 10</Link>
          <Link href="javascript:void(0)">Hall da Fama - Destaques</Link>
          <Link href="javascript:void(0)">Melhores do Ano</Link>
          <Link href="javascript:void(0)">Equipe Cartoleiro</Link>
          <Link href="javascript:void(0)">Fale Conosco</Link>
        </Item>
        <Item>
          <Title>REDES SOCIAIS</Title>
          <Link target="_blank" href="https://www.facebook.com/cartoleirofanatico2">Facebook</Link>
          <Link target="_blank" href="https://twitter.com/CartoleiroFNC">Twitter</Link>
          <Link target="_blank" href="https://www.instagram.com/cartoleiro_fanatico/">Instagran</Link>
          <Link target="_blank" href="javascript:void(0)">Google+</Link>
          <Link target="_blank" href="https://www.youtube.com/channel/UCDQbYWr-zc-aDvvDLYQTwcQ">Youtube</Link>
        </Item>
        <Item>
          <Items>
            <Image src="../images/baixe-aplicativo.png" />
            <Label>BAIXE O APLICATIVO</Label>
            <Description>O Cartoleiro com você onde estiver</Description>
            <Link href="javascript:void(0)">Play Store</Link>
            <Link href="javascript:void(0)">Apple Store</Link>
          </Items>
          <Items>
            <Image src="../images/tornar-socio.png" />
            <Label>TORNE-SE SÓCIO</Label>
            <Description>O Cartoleiro com você onde estiver</Description>
            <Link href="javascript:void(0)">Ver Planos</Link>
          </Items>
        </Item>
      </Content>
      <Copyright>
        <Text>&copy; 2023 - CARTOLEIRO FANÁTICO</Text>
        <Text title="Email Desenvolvedor: wedson_cross@hotmail.com">Desenvolvedor by Wedson Santos - EQUIPE CARTOLEIRO</Text>
      </Copyright>
    </Container>
  );
}

export default footer;
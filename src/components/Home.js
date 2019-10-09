import React from 'react';
import styled from 'styled-components'


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 6em;
  background: papayawhip;
`;


 export const Home = () => {
  return (
    <Wrapper>
    <Title>
      Accueil, Bienvenue sur le site
    </Title>
  </Wrapper>
        );
    }


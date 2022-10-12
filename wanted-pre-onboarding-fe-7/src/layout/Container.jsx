import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = () => {
  return (
    <ContainerWrapper>
      <ContainerLayout>
        <Outlet />
      </ContainerLayout>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  width: 100%;
`;

const ContainerLayout = styled.div`
  width: 75%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Container;

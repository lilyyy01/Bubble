import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import DynamicBackground from "./components/dynamicBackground"
import TeamIntros from "./components/teamIntros"

const ParallaxContainer = styled.div`
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #e4e4e7;
`;

const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  transform-style: preserve-3d;
`;

const SingleColumnContainer = styled.div`
  margin: auto;
  width: 60%;
  padding: 20px;
  align-content: center;
  text-align: center; // Center text-align for children
`;

const Content = styled.div`
  margin: auto; // Center the content
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-shadow: -1px -1px 0 #454a68, 1px -1px 0 #454a68, -1px  1px 0 #454a68, 1px  1px 0 #454a68;
`;

const Button = styled.button`
  padding: 10px;
  width: 100px;
  font-size: 15px;
  background: #898ca5;
  color: #ffffff;
  text-shadow: -1px -1px 0 #454a68, 1px -1px 0 #454a68, -1px  1px 0 #454a68, 1px  1px 0 #454a68;
  border-radius: 15px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #454a68;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    opacity: .75;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
`;

const LandingPage: React.FC = () => {
    return (
        <ParallaxContainer>
            <DynamicBackground />
            <ButtonContainer>
                <Link href="/login" passHref>
                    <Button>Login</Button>
                </Link>
                <Link href="/googleVerify" passHref>
                    <Button>Register</Button>
                </Link>
            </ButtonContainer>
            <ParallaxSection>
                <SingleColumnContainer>
                    <Content>Meet the Development Team</Content>
                </SingleColumnContainer>
                <TeamIntros />
            </ParallaxSection>
        </ParallaxContainer>
    );
};

export default LandingPage;
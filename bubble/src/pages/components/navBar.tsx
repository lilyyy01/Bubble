import React from 'react';
import styled from 'styled-components';
import { router } from "next/client";
import { useRouter } from "next/router";
import { CalendarDaysIcon, Cog6ToothIcon, FaceSmileIcon, HomeIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/solid';

const fontColor = "#000000";

const HeaderBase = styled.div`
display: flex;
justify-content: space-between;
background: #de5499;
grid-area: hd;
height: 70px;
padding-right: 10px
`;

const HeaderLeftBase = styled.div`
font-weight: 900;
  font-size: 1.5em;
display: flex;
flex-direction: row;
align-items: center;
flex-grow: 1;
& > h2 {
  color: ${fontColor};
  margin: 0.75em 0 0.75em 0.5em;
}
& > a {
  text-decoration: none;
  & > h2 {
    color: ${fontColor};
    margin: 0.75em 0 0.75em 0.5em;
  }
}
`;

const HeaderLeft: React.FC = () => (
  <HeaderLeftBase>
    <LogoCircle color="#ffdbe9">
      <SparklesIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </LogoCircle>
    <h2>Bubble</h2>
  </HeaderLeftBase>
);

const Circle = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 2px 3px 0px 1px #E99F4C;
`;

const CircleButton = styled.button<{ color: string }>`
  width: 44px;
  height: 44px;
  background-color: ${(props) => props.color};
  border-radius: 50%; // Ensures circle shape
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 2px 3px 0px 1px #E99F4C;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  // Remove default button styling
  padding: 0;
  margin-left: 5px;
  outline: none;

  // Styling for hover state
  &:hover {
    opacity: .8;
  }

  // Styling for focus state
  &:focus {
    outline: 2px solid #264143; // Ensures accessibility
  }
`;

const IconCircle = styled(Circle)`
  position: relative;
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  & > div:last-child {
    margin-right: 20px; // Adds spacing to the right of the last circle
  }
`;

const LogoCircle = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
`;

const HeaderRight: React.FC = () => {

  const router = useRouter(); // Use the useRouter hook

  // Handler functions for navigation
  const navigateToHome = () => router.push('/home');
  const navigateToFriends = () => router.push('/friends');
  const navigateToEvents = () => router.push('/events');
  const navigateToSettings = () => router.push('/settings');
  const navigateToProfile = () => router.push('/profile');

  return (
    <CircleContainer>
      <CircleButton color="#f0f0f0" onClick={navigateToHome} title="Home">
        <HomeIcon className="w-6 h-6" style={{ position: 'absolute' }} />
      </CircleButton>
      <CircleButton color="#f0f0f0" onClick={navigateToFriends}>
        <UserGroupIcon className="w-6 h-6" style={{ position: 'absolute' }} />
      </CircleButton>
      <CircleButton color="#f0f0f0" onClick={navigateToEvents}>
        <CalendarDaysIcon className="w-6 h-6" style={{ position: 'absolute' }} />
      </CircleButton>
      <CircleButton color="#f0f0f0" onClick={navigateToSettings}>
        <Cog6ToothIcon className="w-6 h-6" style={{ position: 'absolute' }} />
      </CircleButton>
      <CircleButton color="#f0f0f0" onClick={navigateToProfile}>
        <FaceSmileIcon className="w-6 h-6" style={{ position: 'absolute' }} />
      </CircleButton>
    </CircleContainer>
  );
};

export const Header: React.FC = () => (
  <HeaderBase>
    <HeaderLeft />
    <HeaderRight />
  </HeaderBase>
);

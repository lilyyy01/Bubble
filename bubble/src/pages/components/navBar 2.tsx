import React from 'react';
import styled from 'styled-components';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon } from '@heroicons/react/24/solid';
import { HomeIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/solid';

const fontColor = "#000000";

const HeaderLeftBase = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex-grow: 1;
font-style: italic;
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
  <LogoCircle color="#e4e4e4">Logo</LogoCircle>
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
`;

const IconCircle = styled(Circle)`
  position: relative; // Adjust as needed for icon positioning
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  & > div:last-child {
    margin-right: 10px; // Adds spacing to the right of the last circle
  }
`;

const LogoCircle = styled.div<{ color: string }>`
  width: 60px;  // Increased size for the logo
  height: 60px;  // Increased size for the logo
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const HeaderRight: React.FC = () => (
  <CircleContainer>
    <IconCircle color="#f0f0f0">
      <HomeIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </IconCircle>
    <IconCircle color="#f0f0f0">
      <UserGroupIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </IconCircle>
    <IconCircle color="#f0f0f0">
      <EnvelopeIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </IconCircle>
    <IconCircle color="#f0f0f0">
      <Cog6ToothIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </IconCircle>
    <IconCircle color="#f0f0f0">
      <FaceSmileIcon className="w-6 h-6" style={{ position: 'absolute' }} />
    </IconCircle>
  </CircleContainer>
);

const HeaderBase = styled.div`
display: flex;
justify-content: space-between;
background: #d3d3d3;
grid-area: hd;
`;

export const Header: React.FC = () => (
<HeaderBase>
  <HeaderLeft />
  <HeaderRight />
</HeaderBase>
);

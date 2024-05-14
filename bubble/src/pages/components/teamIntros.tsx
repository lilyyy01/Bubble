import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  align-items: center;
  padding: 15px;
  margin: 0 auto;
  max-width: 1200px; // Adjust the max-width as needed for your layout
`;

const GridItem = styled.div`
  display: flex; // Use flexbox
  flex-direction: column; // Stack children vertically
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
  text-align: center;
  background-color: #d6d9f8;
  height: auto;
  width: 105%;
  border: 2px solid #454a68;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #ffce10;
  padding: 20px;
`;

const ProfileImageWrapper = styled.div`
  padding: 1em;
  background-color: #FFFFFF;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  display: flex;
  justify-content: center;
  align-items: center;
  // Removed the max-width and max-height constraints
  margin-bottom: 20px; // Provide some space below the image
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
`;

const Title = styled.div`
  padding-top: 10px;
  font-weight: 900;
  font-size: 1.25em;
`;

const TeamIntros: React.FC = () => {
    return (
        <GridContainer>
            <GridItem>
                <ProfileImageWrapper>
                    <ProfileImage src="./ElenaPicture.jpeg" alt="Elena Chen" />
                </ProfileImageWrapper>
                <Title>Elena Chen - Backend</Title>
                <div>BS in Computer Science and Architecture</div>
                <div>Hometown: Dallas, TX</div>
            </GridItem>
            <GridItem>
                <ProfileImageWrapper>
                    <ProfileImage src="/ElisePicture.jpeg" alt="Elise Farley" />
                </ProfileImageWrapper>
                <Title>Elise Farley - Frontend</Title>
                <div>BS in Computer Science and Communication of S&T</div>
                <div>Hometown: Barrington, IL</div>
            </GridItem>
            <GridItem>
                <ProfileImageWrapper>
                    <ProfileImage src="/LexiPicture.jpeg" alt="Lexi Foster" />
                </ProfileImageWrapper>
                <Title>Lexi Foster - Frontend</Title>
                <div>BS in Computer Science and HOD</div>
                <div>Hometown: Gilbert, AZ</div>
            </GridItem>
            <GridItem>
                <Title>Sarah Hoover - Backend</Title>
                <div>BS in Computer Science</div>
                <div>Hometown:</div>
            </GridItem>
            <GridItem>
                <Title>Katie Kunesh - Frontend</Title>
                <div>BS in Computer Science</div>
                <div>Hometown:</div>
            </GridItem>
            <GridItem>
                <Title>Yuening Li - Backend</Title>
                <div>MS in Computer Science</div>
                <div>Hometown:</div>
            </GridItem>
        </GridContainer>
    );
};

export default TeamIntros;
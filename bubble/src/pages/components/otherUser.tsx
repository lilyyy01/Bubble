import styled from "styled-components";
import React, {FC} from "react";

const SmallUserContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
`;

const SmallUserPicture = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #9eadad;
  margin: 5px;
`;

const SmallUserName = styled.small`
  margin: 0.25em;
  color: #264143;
`;

export type UserFirstLastPic = {
    id: string,
    first_name: string,
    last_name: string,
    city: string,
    state: string,
}

interface PersonPictureNameProps {
    person: UserFirstLastPic
}

/**
 * Creates a small component with a picture and name of another user
 * @param person
 * @constructor
 */
export const SmallUser:FC<PersonPictureNameProps> = ({person}) => {
    return (
        <SmallUserContainer>
            <SmallUserPicture></SmallUserPicture>
            <SmallUserName>{person.first_name} {person.last_name}</SmallUserName>
        </SmallUserContainer>
    )
};

const LargeUserContainer = styled.div`
  width: 7em;
  height: 7em;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 2px 3px 0px 1px #e0c3bf;
  border: 1px solid #e0c3bf;
  margin-right: 1em;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
`;

const LargeUserPicture = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: #9eadad;
  margin: .5em;
`;

const LargeUserName = styled.small`
  margin: 0em;
  color: #264143;
`;

export const LargeUser:FC<PersonPictureNameProps> = ({person}) => {
    return (
        <LargeUserContainer>
            <LargeUserPicture></LargeUserPicture>
            <LargeUserName>{person.first_name} {person.last_name}</LargeUserName>
        </LargeUserContainer>
    )
};

import styled from "styled-components";
import {SmallUser, UserFirstLastPic} from "@/pages/components/otherUser";
import React, {FC, useState} from "react";
import {Event} from "@/pages/components/eventComponent";
import {friendListType} from "@/pages/home";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";

const DropdownTopButton = styled.div`
  display: flex;
  flex-flow: row;
  width: 19em;
  height: 2.5em;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #526c6e;
  border-top: 1px solid #526c6e;
  cursor: pointer;
  color: #264143;
`;

const DropdownItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 19em;
  height: 2.5em;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #9eadad;
`;

const DropdownItemsListContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const FriendLocation = styled.small`
  margin: 0.1em;
  color: #9eadad;
`;

interface FriendDropdownItemProps {
    person: UserFirstLastPic;
}

/**
 * Creates a dropdown item for the friends dropdown
 * @param person The friend to display
 * @returns The dropdown item
 */
export const FriendDropdownItem: FC<FriendDropdownItemProps> = ({person}) => {
    return (
        <DropdownItemContainer>
            <SmallUser person={person}></SmallUser>
            <FriendLocation>{person.city}, {person.state}</FriendLocation>
        </DropdownItemContainer>
    )
}

interface FriendDropdownListProps {
    friends: UserFirstLastPic[];
}

/**
 * Displays the dropdown list of friends each with their picture, name, and location
 *
 * @param friends The list of the current user's friends
 * @returns The formatted list of friends
 */
const FriendDropdownList: FC<FriendDropdownListProps> = ({ friends }) => {
    return (
        <DropdownItemsListContainer>
            {friends.map((friend, index) => (
                <FriendDropdownItem key={index} person={friend}></FriendDropdownItem>
            ))}
        </DropdownItemsListContainer>
    );
};

/**
 * Displays a dropdown of the current user's friends
 *
 * @returns The friends dropdown component
 */
export const FriendDropdown = () => {
    const [open, setOpen] = React.useState(false);
    const [friends, setFriends] = useState<friendListType>({
        friends: [{
            id: "123",
            first_name: "John",
            last_name: "Doe",
            city: "Nashville",
            state: "TN"
        }],
    });

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <DropdownTopButton onClick={handleOpen}>
                <p>Your Friends</p>
                <ChevronDownIcon style={{width: "60%", height:"60%", margin:"-4em"}}></ChevronDownIcon>
            </DropdownTopButton>
            {open ? (
                <FriendDropdownList friends={friends.friends}>
                </FriendDropdownList>
            ) : null}
        </div>
    );
};
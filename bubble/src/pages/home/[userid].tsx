import React, {useState, useEffect, FC, Dispatch, SetStateAction} from 'react';
import { useRouter } from 'next/router';
import { useParams } from "next/navigation";
import styled from "styled-components";
import {Event, EventList, EventType} from "../components/eventComponent";
import {EventPopup} from "../components/eventDetailsPopup";
import {Header} from "../components/navBar";
import {LargeUser, SmallUser, UserFirstLastPic} from "@/pages/components/otherUser";
import {FriendDropdown} from "@/pages/components/dropdowns";
import { PlusIcon } from '@heroicons/react/24/solid';
import styles from './home.module.css';


const GridBase = styled.div`
  display: grid;
  background-color: #F4ECEA;
  grid-template-columns: 1fr 800px 30em;
  grid-template-rows: auto auto auto;
  grid-gap: 20px;
  grid-template-areas:
      "h h h"
      "l main r"
      "ft ft ft";
`;

const GridHeader = styled.div`
    grid-area: h;
`;
const GridLeft = styled.div`
    grid-area: l;
    padding: 20px 0;
`;

const GridRight = styled.div`
    display: flex;
    grid-area: r;
    padding: 20px 0;
    justify-content: center;
    align-items: flex-start;
`;

const GridMain = styled.div`
    display: flex;
    flex-flow: column;
    grid-area: main;
    padding: 20px 0;
    justify-content: center;
    align-items: center;
`;

const GridFooter = styled.div`
    grid-area: ft;
  padding: 20px 0;
`;

const PersonalBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 22em;
  min-height: 40em;
  height: fit-content;
  border-radius: 15px;
  background-color: #ffffff;
  margin: 1em;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  border: 2px solid #264143;
`;

const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background-color: #9eadad;
  margin: 1em;
  cursor: pointer;
`;

const ProfileName = styled.h3`
  margin: 0.25em;
  color: #264143;
  cursor: pointer;
`;

const ProfileLocation = styled.small`
  margin: 0.1em;
  margin-bottom: 1em;
  color: #9eadad;
`;


interface PersonalProps {
    user: UserState;
}

export const Personal: FC<PersonalProps> = ({user}) => {
    const router = useRouter();
    return (
        <PersonalBlock>
            <ProfilePicture onClick={() => {router.push(`/profile`)}}></ProfilePicture>
            <ProfileName onClick={() => {router.push(`/profile`)}}> {user.first_name + " " + user.last_name}</ProfileName>
            <ProfileLocation>{user.city + ", " + user.state}</ProfileLocation>
            <FriendDropdown></FriendDropdown>
        </PersonalBlock>
    )
}

const CreateEventBlock = styled.div`
  display: flex;
  flex-flow: row;
  width: 700px;
  height: 100px;
  border-radius: 15px;
  background-color: #fcfcfc;
  margin: 1em;
  align-items: center;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  border: 2px solid #264143;
`;

const CreateEventText = styled.h2`
  color: #264143;
`;

const CreateButton = styled.div`
    display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #EDDCD9;
  margin: 1em;
  justify-content: center;
    align-items: center;
`;

export const CreateEvent = () => {
    return (
        <CreateEventBlock>
            <CreateButton>
                <PlusIcon style={{width: "70%", height:"70%", color: "white"}}></PlusIcon>
            </CreateButton>
            <CreateEventText>
                Create new event
            </CreateEventText>
        </CreateEventBlock>
    )
}

const PeopleInYourCommunityBlock = styled.div`
  width: auto;
  max-width: 700px;
  height: auto;
  border-radius: 15px;
  background-color: #fcfcfc;
  margin: 1em;
  align-items: center;
  overflow: hidden;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  border: 2px solid #264143;
`;

const PeopleInYourCommunityText = styled.h2`
  margin-left: 1em;
  color: #264143;
`;

const NewConnectionsBlock = styled.div`
  width: auto;
  height: auto;
  margin: 1em;
  align-items: center;
  overflow-x: scroll;
  padding: 0.25em;

`;

const NewConnectionButtonsContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: fit-content;
  height: auto;
  flex-wrap: nowrap;
`;


interface NewConnectionsListProps {
    people: UserFirstLastPic[];
}
export const NewConnectionsList:FC<NewConnectionsListProps> = ({people}) => {

    let newConnectionsList = people.map(
        (person, index) => <LargeUser key={index} person={person}/>
    );

    return (
        <PeopleInYourCommunityBlock>
            <PeopleInYourCommunityText>
                People in your community
            </PeopleInYourCommunityText>
            <NewConnectionsBlock>
            <NewConnectionButtonsContainer>
                {newConnectionsList}
            </NewConnectionButtonsContainer>
            </NewConnectionsBlock>
        </PeopleInYourCommunityBlock>
    )
}

type HomeParams = {
    username: string;
};

export type eventPopupType = {
    isVisible: boolean,
    event: EventType
};

export type friendListType = {
    friends: UserFirstLastPic[],
};

const emptyEvent: EventType = {
    event_name: "",
    community: "",
    location: "",
    date_time: 0,
    creation_date: 0,
    description: "",
    tags: "none",
    class_limit: 0,
    max_spots: 0,
    attendees: []
}

interface UserState {
    username: string;
    first_name: string;
    last_name: string;
    city: string;
    state: string;
    events: EventType[];
}

const Home = () => {
    //const { username } = useParams<HomeParams>();
    let [eventPopup, setEventPopup] = useState<eventPopupType>({
        isVisible: false,
        event: emptyEvent
    });
    let [state, setState] = useState<UserState>({
        username: "",
        first_name: "Katie",
        last_name: "Kunesh",
        city: "Nashville",
        state: "TN",
        events: [{
            event_name: "Brunch at Sun and Fork",
            community: "id",
            location: "Sun and Fork",
            date_time: 1708485198947,
            creation_date: 1708485198947,
            description: "Lets eat brunch at sun and fork",
            tags: "none",
            class_limit: 2024,
            max_spots: 20,
            attendees: [{
                    id: "1",
                    first_name: "Katie",
                    last_name: "Kunesh",
                    city: "Nashville",
                    state: "TN"
                },
                {
                    id: "2",
                    first_name: "Lexi",
                    last_name: "Foster",
                    city: "Nashville",
                    state: "TN"
                },
                {
                    id: "3",
                    first_name: "Elena",
                    last_name: "Chen",
                    city: "Nashville",
                    state: "TN"
                },
                {
                    id: "4",
                    first_name: "Sarah",
                    last_name: "Hoover",
                    city: "Nashville",
                    state: "TN"
                },
                {
                    id: "5",
                    first_name: "Yuening",
                    last_name: "Li",
                    city: "Nashville",
                    state: "TN"
                },
                {
                    id: "6",
                    first_name: "Elise",
                    last_name: "Farley",
                    city: "Nashville",
                    state: "TN"
                },
            ]
        },
            {
                event_name: "Walk around the Frist",
                community: "id",
                location: "Frist Museum",
                date_time: 1508485198947,
                creation_date: 1508485198947,
                description: "Lets tour the Frist",
                tags: "none",
                class_limit: 2024,
                max_spots: 20,
                attendees: [{
                    id: "1",
                    first_name: "Katie",
                    last_name: "Kunesh",
                    city: "Nashville",
                    state: "TN"
                },
                    {
                        id: "2",
                        first_name: "Lexi",
                        last_name: "Foster",
                        city: "Nashville",
                        state: "TN"
                    },
                    {
                        id: "3",
                        first_name: "Elena",
                        last_name: "Chen",
                        city: "Nashville",
                        state: "TN"
                    },
                    {
                        id: "4",
                        first_name: "Sarah",
                        last_name: "Hoover",
                        city: "Nashville",
                        state: "TN"
                    },
                    {
                        id: "5",
                        first_name: "Yuening",
                        last_name: "Li",
                        city: "Nashville",
                        state: "TN"
                    },
                    {
                        id: "6",
                        first_name: "Elise",
                        last_name: "Farley",
                        city: "Nashville",
                        state: "TN"
                    },
                ]
            }]
    });

    interface UserData {
        id: string;
        // Add other properties as needed
    }

    // const fetchUser = () => {
    //     fetch(`/api/v1/user`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const userData = data as UserData;
    //             setState((prev) => ({
    //                 ...prev,
    //                 first_name: userData.id,
    //             }));
    //         })
    //         .catch((err) => console.log(err));
    // };
    //
    // useEffect(() => {
    //     fetchUser();
    //     console.log(state);
    // }, [state]);

    // {eventPopup.isVisible ? (
    //     <EventPopup
    //         event={eventPopup.event}
    //         onExit={() => {setEventPopup({isVisible: false, event: emptyEvent
    //         })}}
    //     />
    // ) : null}

    return (
        <div className={styles.gridBase}>
            <div className={styles.gridHeader}>
                <Header/>
            </div>
            <div className={styles.gridLeft}></div>
            <div className={styles.gridMain}>
                <CreateEvent />
                <NewConnectionsList people={state.events[0].attendees} />
                <CreateEventText style={{alignSelf: "flex-start", marginLeft: "2em", marginBottom: "0em"}}>Upcoming Events in Your Bubble</CreateEventText>
                <EventList events={state.events} setEventPopup={setEventPopup} />
            </div>
            <div className={styles.gridRight}>
                <Personal user={state} />
            </div>
            <div className={styles.gridFooter}></div>
        </div>
    );
};

export default Home;
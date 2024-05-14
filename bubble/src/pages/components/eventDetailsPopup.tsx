import styled from "styled-components";
import {SmallUser, UserFirstLastPic} from "@/pages/components/otherUser";
import React, {FC, MouseEventHandler} from "react";
import {EventType} from "@/pages/components/eventComponent";
import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './eventDetailsPopup.module.css';

const AttendeesContainer = styled.div`
  margin-top: 1em;
  width: 100%;
`;

const AttendeesHeader = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #264143;
`;

const AttendeesListContainer = styled.div`
  width: 100%;
  height: 17em;
  border: 1px solid #9eadad;
  border-radius: 8px;
  overflow: hidden; /* Hide overflow content */
`;

const AttendeesScrollContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5em;
  overflow-y: auto; /* Enable vertical scrolling if needed */
  max-height: 100%; /* Fill the available height within AttendeesListContainer */
`;

interface AttendeesListProps {
    attendees: UserFirstLastPic[];
}

/**
 * Displays a formatted list of attendees
 *
 * @param attendees The list of attendees
 * @returns The formatted list of attendees
 */
const AttendeesList: FC<AttendeesListProps> = ({ attendees }) => {
    return (
        <div className={classes.attendeesListContainer}>
            <div className={classes.attendeesScrollContainer}>
            {attendees.map((attendee, index) => (
                    <SmallUser key={index} person={attendee}></SmallUser>
            ))}
            </div>
        </div>
    );
};

/**
 * Formats a date time to a string
 *
 * @param dateTime The date time to format
 * @returns The formatted date time
 */
function formatDate(dateTime: number): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateTime).toLocaleString('en-US', options);
}

export function formatTime(dateTime: number): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Date(dateTime).toLocaleString('en-US', options);
}

interface EventPopupProps {
    event: EventType,
    onExit: MouseEventHandler<HTMLButtonElement>
}

/**
 * Opens a popup with the details of an event
 *
 * @param event The event to display
 * @param onExit The function to call when the popup is closed
 * @returns The event popup
 */
export const EventPopup:FC<EventPopupProps>  = ({event, onExit}) => {

    return (
      <Paper className={classes.popupContainer} >
        <div className={classes.titleAndDetails}>
          <Text size="sm" c="gray">{event.location}</Text>
        </div>
        <div className={classes.mainLeftContainer}>
          <Title order={5}>Description</Title>
          <div className={classes.descriptionText}>
            {event.description}
          </div>
        </div>
        <div className={classes.mainRightContainer}>
          <div className={classes.dateTimeLocationContainer}>
          <div className={classes.dateTimeContainer}>
            <Title order={5}>Date and Time</Title>
            <Text size="sm">{formatDate(event.date_time)}</Text>
            <Text size="sm">{formatTime(event.date_time)}</Text>
          </div>
          <div className={classes.locationContainer}>
            <Title order={5}>Location</Title>
            <Text size="sm">{event.location}</Text>
          </div>
          </div>
          <div className={classes.attendeesContainer}>
            <Title order={5}>Attendees ({event.attendees.length}/{event.max_spots})</Title>
            <AttendeesList attendees={event.attendees} />
          </div>
        </div>
        <div className={classes.footerContainer}>
          <Button onClick={onExit}>RSVP</Button>
        </div>
      </Paper>
    );
};

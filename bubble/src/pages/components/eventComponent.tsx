import React, {Dispatch, FC, SetStateAction} from 'react';
import {UserFirstLastPic} from "@/pages/components/otherUser";
import {eventPopupType} from "@/pages/home";
import {formatTime} from "@/pages/components/eventDetailsPopup";
import { Paper, Text, Button } from '@mantine/core';
import classes from './eventComponent.module.css';
import { useDisclosure } from "@mantine/hooks";
import { Modal } from '@mantine/core';
import { EventPopup } from './eventDetailsPopup';

export type EventType = {
    event_name: string,
    community: string,
    location: string,
    date_time: number,
    creation_date: number,
    description: string,
    tags: string,
    class_limit: number,
    max_spots: number,
    attendees: UserFirstLastPic[],
}

interface EventProps {
    event: EventType,
    setEventPopup: any
}

/**
 * Creates a preview of an event for the Home Page
 * @param event The event to display
 * @param setEventPopup The function to toggle the event popup
 * @return The Event component
 */
export const Event: FC<EventProps> = ({event, setEventPopup}) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date(event.date_time)
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <Modal size="xl" opened={opened} onClose={close} title={event.event_name} centered styles={{
        title: {
            fontSize: 25,
            fontWeight: 1000,
            paddingBottom: 0,
        },
        header: {
            paddingBottom: 0,
        },
      }}>
            <EventPopup event={event} onExit={close}/>
      </Modal>
        <Paper
        className={classes.paper}
         shadow="sm"
         radius="md"
         onClick={open}
         >
            <div className={classes.titleAndDetails}>
                <Text className={classes.root} size="xl">{event.event_name}</Text>
                <Text size="sm" c="gray">{weekday[date.getDay()]} • {formatTime(event.date_time)} • {event.location}</Text>
            </div>
            <Button onClick={open}>RSVP</Button>
        </Paper>
        </>
    )
}

interface EventListProps {
    events: EventType[],
    setEventPopup: Dispatch<SetStateAction<eventPopupType>>
}

/**
 * Creates a list of events for the Home Page
 * @param events The events to display
 * @param setEventPopup The function to toggle an event popup
 * @return The EventList component
 */
export const EventList: FC<EventListProps> = ({events, setEventPopup}) => {

    let allEvents = events.map(
        (event, index) => <Event key={index} event={event} setEventPopup={setEventPopup}/>
    );

    return (
        <div className={classes.eventListContainer}>
            {allEvents}
        </div>
    )
}
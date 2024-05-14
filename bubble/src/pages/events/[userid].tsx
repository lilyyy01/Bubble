import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import { Header } from "@/pages/components/navBar";
import { EventList, Event, EventType } from "../components/eventComponent";
import { DateInput, DatePickerInput } from '@mantine/dates';
import { DatePicker } from '@mantine/dates';
import { Tabs, ScrollArea, MultiSelect, RangeSlider, SimpleGrid, TextInput, Stack, Button } from "@mantine/core";
import styles from './events.module.css';
import Chatbot from '../components/chatAI';

interface UserState {
  username: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  events: EventType[];
}

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

export type eventPopupType = {
  isVisible: boolean,
  event: EventType
};

const Container = styled.div`
  display: flex;
  //height: calc(100vh - 60px);
  gap: 10px; // Adds space between Main and Side columns
  margin-top: 10px //adds space to header
`;

const UpcomingEventsContainer = styled.div`
  //width: calc(50% - 10px); // Adjusting for the gap
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  //gap: 10px; // Adds space between items in the column
  //margin-left: 10px;
  background-color: #f5cebc;
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #E99F4C;
`;

const EventsText = styled.h2`
  color: white;
  font-size: 10px;
  background-color: rgba(222, 84, 153, 0.5);
  border-radius: 10px;
  padding: 7px;
`;

const SearchEventsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f5cebc;
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  flex-direction: column;
  margin: 10px; // Adds margin around each half, preventing them from touching
  &:first-child {
    margin-top: 0; // Removes top margin from the first Half
  }
  &:last-child {
    margin-bottom: 0; // Removes bottom margin from the last Half
  }
`;

const EventListWrapper = styled.div`
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PlaceHolderUpcomingEvents = () => {

  // Placeholder data for events
  let [eventPopup, setEventPopup] = useState<eventPopupType>({
    isVisible: false,
    event: emptyEvent
  });
  const placeholderEvents: EventType[] = [
    {
      event_name: "Community Yoga Class",
      community: "Wellness and Health",
      location: "Community Park",
      date_time: new Date('2024-03-10T10:25:00').getTime(),
      creation_date: new Date('2024-02-20').getTime(),
      description: "Join us for a relaxing yoga session in the park. All levels welcome!",
      tags: "yoga, wellness, community",
      class_limit: 30,
      max_spots: 30,
      attendees: [],
    },
    {
      event_name: "Tech for Good Hackathon",
      community: "Tech Innovators",
      location: "Innovation Hub Downtown",
      date_time: new Date('2024-04-05T09:15:00').getTime(),
      creation_date: new Date('2024-02-25').getTime(),
      description: "Collaborate on technology projects that solve social issues.",
      tags: "technology, hackathon, coding",
      class_limit: 2024,
      max_spots: 100,
      attendees: [],
    },
    {
      event_name: "Tech for Good Hackathon",
      community: "Tech Innovators",
      location: "Innovation Hub Downtown",
      date_time: new Date('2024-04-05T09:15:00').getTime(),
      creation_date: new Date('2024-02-25').getTime(),
      description: "Collaborate on technology projects that solve social issues.",
      tags: "technology, hackathon, coding",
      class_limit: 2024,
      max_spots: 100,
      attendees: [],
    },
    {
      event_name: "Tech for Good Hackathon",
      community: "Tech Innovators",
      location: "Innovation Hub Downtown",
      date_time: new Date('2024-04-05T09:15:00').getTime(),
      creation_date: new Date('2024-02-25').getTime(),
      description: "Collaborate on technology projects that solve social issues.",
      tags: "technology, hackathon, coding",
      class_limit: 2024,
      max_spots: 100,
      attendees: [],
    },
    {
      event_name: "Local Farmers Market",
      community: "Eco-Friendly Living",
      location: "Central Plaza",
      date_time: new Date('2024-03-15T08:45:00').getTime(),
      creation_date: new Date('2024-02-28').getTime(),
      description: "Support local farmers and enjoy fresh, organic produce.",
      tags: "farmers market, organic, local",
      class_limit: 2022,
      max_spots: 200,
      attendees: [],
    }
  ];
  return (
    <EventList events={placeholderEvents} setEventPopup={setEventPopup}></EventList>
  )
};

const PlaceHolderMyEvents = () => {

  // Placeholder data for events
  let [eventPopup, setEventPopup] = useState<eventPopupType>({
    isVisible: false,
    event: emptyEvent
  });
  const placeholderEvents: EventType[] = [
    {
      event_name: "FGH Grind Sesh",
      community: "Tech Innovators",
      location: "Innovation Hub Downtown",
      date_time: new Date('2024-04-17T09:20:00').getTime(),
      creation_date: new Date('2024-02-25').getTime(),
      description: "Collaborate on technology projects that solve social issues.",
      tags: "technology, hackathon, coding",
      class_limit: 2024,
      max_spots: 100,
      attendees: [],
    },
    {
      event_name: "Frolicking in the Meadow",
      community: "Tech Innovators",
      location: "Flower meadow",
      date_time: new Date('2024-04-05T09:7:00').getTime(),
      creation_date: new Date('2024-02-25').getTime(),
      description: "Collaborate on technology projects that solve social issues.",
      tags: "technology, hackathon, coding",
      class_limit: 2024,
      max_spots: 100,
      attendees: [],
    },
    {
      event_name: "Local Farmers Market",
      community: "Eco-Friendly Living",
      location: "Central Plaza",
      date_time: new Date('2024-03-15T08:45:00').getTime(),
      creation_date: new Date('2024-02-28').getTime(),
      description: "Support local farmers and enjoy fresh, organic produce.",
      tags: "farmers market, organic, local",
      class_limit: 2022,
      max_spots: 200,
      attendees: [],
    }
  ];
  return (
    <EventList events={placeholderEvents} setEventPopup={setEventPopup}></EventList>
  )
};

const EventsTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('upcoming');

  return (
    <div style={{ width: '90%', flexDirection: 'column', paddingTop: '10px' }}>
      <Tabs variant={"pills"} color='pink' value={activeTab} onChange={setActiveTab}>
        <Tabs.List grow>
          <Tabs.Tab value="upcoming">Upcoming Events</Tabs.Tab>
          <Tabs.Tab value="my">My Events</Tabs.Tab>
          <Tabs.Tab value="create">Create an Event</Tabs.Tab>
        </Tabs.List>

        <ScrollArea style={{ height: '1fr' }}>
          <Tabs.Panel value="upcoming">
            <EventListWrapper>
              <PlaceHolderUpcomingEvents />
            </EventListWrapper>
          </Tabs.Panel>
          <Tabs.Panel value="my">
            <EventListWrapper>
              <PlaceHolderMyEvents />
            </EventListWrapper>
          </Tabs.Panel>
          <Tabs.Panel value="create">
            <EventsText>Create event pop up here</EventsText>
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>
    </div>
  )
};

const SearchEvents = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 1440]); //in minutes
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
  const [tags, setTags] = useState<string[]>([]);

  // Converts the slider value (minutes) to a time string with AM/PM
  const formatTimeValue = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const isAM = value < 720 || value === 1440;
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${isAM ? 'AM' : 'PM'}`;
  };

  const timeLabelDisplay = (value) => {
    return formatTimeValue(value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleSubmit = () => {
    console.log("searched");
    console.log(eventTitle, "times: " + timeRange, "event dates: " + date, "tags: " + tags);
  };

  return (
    <div>
      <Stack >
        <SimpleGrid cols={2} >
          <TextInput
              label="Search by event title"
              placeholder="Event title"
              value={eventTitle}
              onChange={handleTitleChange}
          />
          <RangeSlider
            min={0}
            max={1440} // Max value for minutes in a day
            value={timeRange}
            onChange={setTimeRange}
            step={15} // 15-minute increments
            marks={[
              { value: 0, label: '12 AM' },
              { value: 720, label: '12 PM' },
              { value: 1439, label: '11:59 PM' },
            ]}
            label={timeLabelDisplay}
          />
          <MultiSelect
            label="Filter by event tags"
            placeholder="Choose tags"
            data={['Restaurant', 'Bar', 'Outdoors', 'Art']}
            clearable
            searchable
            hidePickedOptions
            value={tags}
            onChange={setTags}
          />
          <DatePickerInput
            type="range"
            clearable
            allowSingleDateInRange
            label="Pick dates range"
            placeholder="Pick dates range"
            value={date}
            onChange={setDate}
          />
        </SimpleGrid >
        <Button color="brightPink" onClick={handleSubmit}>Search</Button>
      </Stack>
    </div >
  );
};

const EventsPage = () => {
  return (
    <div className={styles.gridBase}>
      <div className={styles.gridHeader}>
        <Header />
      </div>
      <div className={styles.gridLeft}>
        <UpcomingEventsContainer>
          <EventsTabs></EventsTabs>
        </UpcomingEventsContainer>
      </div>
      <div className={styles.gridRightTop}>
        <SearchEventsContainer>
          <EventsText> Search Events </EventsText>
          <SearchEvents></SearchEvents>
        </SearchEventsContainer>
      </div>
      <div className={styles.gridRightBottom}>
        <Chatbot />
      </div>
      <div className={styles.gridFooter}></div>
    </div>
  );
};

export default EventsPage;

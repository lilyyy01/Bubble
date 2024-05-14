import dbConnect from "@/lib/mongoConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import Event from '../../../models/events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect(); // connecting to the database


   /**
   * Register a new event
   * 
   * Note: for optional fields, sent blank strings for now
   */
   if (req.method === 'POST') {
    const today = Date.now();
    try {
      const newEvent = new Event({
        event_name: req.body.event_name,
        community: req.body.community,
        location: req.body.location,
        host: req.body.host,
        date: req.body.date,
        time: req.body.time,
        creation_date: today,
        description: req.body.description,
        tags: req.body.tags,
        class_limit: req.body.class_limit,
        max_spots: req.body.max_spots,
        num_attendees: req.body.num_attendees,
      });
      await newEvent.save();
      res.status(201).json({
        id: newEvent._id
      });
    } catch (err) {
      res.status(400).json({
        error: 'Unable to add event to database',
        message: err
      });
    }
  }

  /**
   * Get event from event id
   */
  else if (req.method === "GET") {
    if  (!req.query.eventid) {
      return res.status(400).json({message: "Missing eventid, alternatives to be implemented"});
      // handle search by different paramters here if id is missing
    }
    else {
      try{
        let event = await Event.findById({
          _id: req.query.eventid
        });
        if (!event) {
          res.status(404).json({
            message: 'event does not exist in database'
          });
        }
        res.status(200).json(event);
      } catch (err){
        console.error(err)
        res.status(500)
          .json({message: "an erorr occured  when handling your request."})
      }
    }
  }

  // todo: add delete and update

  // add events file
}
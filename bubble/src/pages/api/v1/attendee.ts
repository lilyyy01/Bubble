import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoConnect";
import Attendee from "../../../models/attendees";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {method} = req;
  await dbConnect(); // connecting to the database
  
  /**
   * Register a user for an event
   */
  if (req.method === 'POST') {
    // req.body should have the following fields:
    // userid: mongoose.Types.ObjectId,
    // eventid: mongoose.Types.ObjectId,
    if (!req.query.userid || !req.body?.eventid) {
      res.status(400).json({
        message: 'userid and eventid are required for post requests'
      });
    }
    try {
      const newAttendee = new Attendee({
        user_id: req.query.userid,
        event_id: req.body.eventid
      });
      await newAttendee.save();
      res.status(201).json({
        success: true,
        id: newAttendee._id
      });
    } catch (err) {
      res.status(400).json({
        error: err
      });
    }
  }

  /**
   * Given a userid, return events that the user is attending,
   * Or given an eventid, return all users attending the event
   */
  else if (req.method === 'GET') {
    if (req.query.userid) { // userid provided
      try {
        const attendees = await Attendee.find({ user_id: req.query.userid });
        res.status(200).json(attendees);
      } catch(err) {
        res.status(400).json({ 
          error: 'error getting attendees', 
          err 
        })
      }
    } else if (req.body.eventid) { // eventid provided
      try {
        const attendees = await Attendee.find({ event_id: req.body.eventid });
        res.status(200).json(attendees);
      } catch(err) {
        res.status(400).json({ 
          error: 'error getting attendees', 
          err 
        })
      }
    } else { // neither userid nor eventid is provided
      res.status(400).json({
        message: 'userid or eventid is required for get requests'
      });
    }
  }

  /**
   * Unregister a user from an event
   */
  else if (req.method === 'DELETE') {
    // req.body should have the following fields:
    // userid: mongoose.Types.ObjectId,
    // eventid: mongoose.Types.ObjectId,
    if (!req.query?.userid || !req.body?.eventid) {
      res.status(400).json({
        message: 'userid and eventid are required for post requests'
      });
    }
    try {
      await Attendee.findOneAndDelete({ userid: req.query.userid, eventid: req.body.eventid });
      res.status(200).json({
        message: 'attendee deleted'
      });
    } catch (err) {
      res.status(400).json({
        error: 'error deleting attendee',
        err
      });
    }
  }

  /**
   * If the verb is not GET, POST or DELETE
   */
  else {
    res.status(400).send({ message: 'Invalid verb'});
  }
  
}
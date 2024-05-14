import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoConnect";
import Member from "../../../models/member";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {method} = req;
  await dbConnect(); // connecting to the database
  // console.log('Connected to the database');
  
  /**
   * Register a new member
   */
  if (method === 'POST') {
    // req.body should have the following fields:
    // userid: mongoose.Types.ObjectId,
    // communityid: mongoose.Types.ObjectId,
    if (!req.query?.userid || !req.body?.communityid) {
      res.status(400).json({
        message: 'userid and communityid are required for post requests'
      });
    }
    try {
      const newMember = new Member({
        individual: req.query.userid,
        community: req.body.communityid
      });
      await newMember.save();
      res.status(201).json({
        success: true,
        id: newMember._id
      });
    } catch (err) {
      res.status(400).json({
        error: err
      });
    }
  }

  /**
   * Gets all members of a community by communityid
   */
  if (method === 'GET') {
    // req.body should have the following fields:
    // communityid: mongoose.Types.ObjectId,
    if (!req.body?.communityid) {
      res.status(400).json({
        message: 'communityid is required for get requests'
      });
    }
    try {
      const members = await Member.find({ community: req.body.communityid });
      res.status(200).json(members);
    } catch(err) {
      res.status(400).json({ 
        error: 'error getting members', 
        err 
      })
    }
  }

  /** 
   * Delete a member by userid and communityid
   */
  if (method === 'DELETE') {
    // req.body should have the following fields:
    // userid: mongoose.Types.ObjectId,
    // communityid: mongoose.Types.ObjectId,
    if (!req.query.userid || !req.body?.communityid) {
      res.status(400).json({
        message: 'userid and communityid are required for post requests'
      });
    }
    try {
      const member = await Member.findOneAndDelete({ individual: req.query.userid, communityid: req.body.communityid });
      res.status(200).json({
        message: 'member deleted'
      });
    } catch (err) {
      res.status(400).json({
        error: 'error deleting member',
        err
      });
    }
  }
}
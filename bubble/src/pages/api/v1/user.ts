import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoConnect";
import User from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {method} = req;
  await dbConnect(); // connecting to the database
  
  /**
   * Register a new user
   */
  if (method === 'POST') {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({
        success: true,
        userid: newUser._id
      });
    } catch (err) {
      res.status(400).json({
        error: err
      });
    }
  }

  /**
   * Check if a user exists
   */
  else if (req.method === 'HEAD') {
    // req.body should have either an userID field and an email field
    // one will be blank; the other will be used to determine existance
    // either way, id will be returned if the user exists in the system

    if (req.query.userid) {
      let user = await User.findById({
        _id: req.query.userid
      });
      if (!user) {
        res.status(404).json({
          message: 'User does not exist in database.'
        });
      }
      res.status(200).json({ userid: user._id });
    } else {
      res.status(400).json({
        message: 'Missing userID/email'
      });
    }
  }
    /**else if (req.body.email) { // if email field in req.body
      let user = await User.find({
        email: req.body.email
      });
      if (!user) {
        res.status(404).json({
          message: 'user does not exist in database'
        });
      }
      res.status(200).json({ _id: user._id });
    }**/

  /**
   * Fetch user's information with user's ID
   */
  else if (req.method === 'GET') {
    if  (!req.query.userid) {
      return res.status(400).json({message: "Missing User ID in URL."});
    }
    try {
      let user = await User.findById({
        _id: req.query.userid
      });
      if (!user) {
        res.status(401).json({
          message: 'User does not exist in database.'
        });
      } else {
        // todo: deal with privacy/permissions
        // if user is private and users not friends, only reutrn public data
        // otherwise return all data

        const data = { // check session first
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          community: user.community,
          graduation_year: user.graduation_year,
          pronouns: user.pronouns,
          bio: user.bio,
          interests: user.interests,
          industry: user.industry,
          job: user.job,
          grad_school: user.grad_school,
          hometown: user.hometown,
          phone_number: user.phone_number,
          social_media: user.social_media,
          is_private: user.is_private,
          // friends: user.friends
        }
        console.log('User data: ', data);
        res.status(200).json({data: data});
      }
    } catch (err) {
      res.status(400).json({
        message: 'Invalid request body or missing fields while Fetching User.',
      });
    }
  }

  /**
   * Update user's information
   */
  else if (req.method === 'PUT') {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.query.userid },
        { $set: req.body.data },
        { new: true },
      );
      console.log("Updated user data for: ", updatedUser._id);
      res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
          message: 'Invalid request body or missing fields while Updating User',
        });
    }
  }

  /**
   * If the verb is not GET, POST, HEAD, or PUT
   */
  else {
    res.status(400).json({
      message: 'Unknown request.'
    });
  }
}
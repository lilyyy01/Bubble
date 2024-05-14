// This is an example of how to access a session from an API route
import { getSession, signIn } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import User from '../../../models/user';
import dbConnect from "../../../lib/mongoConnect";

export default async function session(
    req: NextApiRequest,
    res: NextApiResponse
) {
  console.log('hitting backend', req.method);
  await dbConnect();


  if (req.method === 'GET') {
    // check if the user is logged in
    const session = await getSession({ req })
    if (session) {
      res.status(200).send(JSON.stringify(session, null, 2))
    }
    else {
      res.status(201).send('No session')
    }

  } else if (req.method === 'POST') {
    console.log(req.body);

    try {
      if  (!req.body?.email || !req.body.password) {
        res.status(401).json({ message: 'Email and Password are required' })
      }
      try {
        const data = req.body;
        console.log("Finding user");
        const user = await User.findOne({
          email: data.email
        });
        console.log("User: ", user);
        if (!user) {
          console.log("User not found");
          res.status(401).json({ error: 'unauthorized' });
          return;
        }

        console.log("Verifying password");
        const hashedPassword = user.encryptPassword(data.password);
        if (hashedPassword === user.hash) {
          console.log("Password verified");
          // TODO: Add session handling logic here if needed
          res.status(200).json({
            email: user.email,
            userid: user._id,
            // other user details as needed
          });
        } else {
          res.status(401).json({ error: 'unauthorized' });
        }
      } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).json({ error: 'internal server error' });
      }

    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication error');

      // // if the user does not exist
      // if (!user) {
      //   res.status(401).json({ message: 'invalid email' })
      // }
      // // if the password is invalid, send 403 response code
      // else if (!(await user.authenticate(req.body.password))) {
      //   res.status(403).send('Wrong credentials');
      // } else {
      //   res.status(200).send('Able to login!');
      //   // // log in the user officiially
      //   // signIn();

      //   // return res.status(200).json({
      //   //   userid: user._id,
      //   //   primary_email: user.primary_email,
      //   // });

    }
  } else if (req.method === 'DELETE') {
    // Sign out the user
    res.status(405).send('Method not allowed');
  }
}
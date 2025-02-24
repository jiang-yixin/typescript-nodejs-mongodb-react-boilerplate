import express, { Request, Response } from 'express';
import connectDB from './db';
import User from './user.model';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.post('/shorten', async (req: Request, res: Response) => {

  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    await newUser.save();

    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error saving User to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.get('/:_id', async (req: Request, res: Response) => {

  const { _id } = req.params;

  try {

    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    console.error('Error fetching User from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

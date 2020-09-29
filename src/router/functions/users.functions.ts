import { Request, Response } from 'express';
import * as moment from 'moment-timezone';
import { UserModel, AttendanceModel } from '../../database';

export async function getUsers(req: Request, res: Response): Promise<Response<any>> {
  try {
    const users = await UserModel.find();
    console.log(users);
    // const data = users.map(user => {
    //   const sessionCount = user.sessions.length;
    //   const date = moment(user.date * 1000).format('DD-MM-YYYY HH:mm:ss');
    //   const totalHours = user.sessions.reduce((acc, curr) => {
    //     const hours = Math.abs((curr.out_stamp - curr.in_stamp));
    //     return acc + hours;
    //   }, 0);
    //   return { date, totalHours: moment(totalHours).format('HH:mm:ss'), sessionCount };
    // });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500);
    console.log(e);
  }
}

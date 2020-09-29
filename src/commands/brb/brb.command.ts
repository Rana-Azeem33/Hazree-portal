import * as moment from 'moment-timezone';
import { UserCommand } from '@app/core';
import { UserDocument, AttendanceModel } from '../../database/models';
import { chatPostMarkdown } from '../../slack/api';

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
export async function brb(com: UserCommand, user: UserDocument): Promise<void> {
  const timestamp = moment().tz(user.tz);
  const date = timestamp.clone().startOf('day').unix();
  const query = {
    team_id: com.teamId,
    user_id: com.userId,
    date
  };
  const attendance = await AttendanceModel.findOne(query) ?? new AttendanceModel({ ...query, sessions: [] });
  const workSessions = attendance.sessions.filter(s => s.ses_type === 'work');
  const currentSession = workSessions.find(s => s.out_stamp === 0);
  if (!currentSession) {
    await chatPostMarkdown(com.userId, '>You are not punched `in` :robot_face:');
    return;
  }
  currentSession.out_stamp = timestamp.unix();
  await attendance.save();
  await chatPostMarkdown(com.userId, '>Use the `back` command once you are back');
}

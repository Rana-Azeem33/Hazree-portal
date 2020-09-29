/* eslint-disable @typescript-eslint/camelcase */
import { UserCommand } from '@app/core';
import { UserDocument, UserModel } from '../../database/models';
import { chatPostMarkdown, userInfo } from '../../slack/api';

export async function register(com: UserCommand, user: UserDocument): Promise<void> {
  if (!user) {
    const userData = await userInfo(com.userId);
    console.log(userData);
    const {
      name, is_admin, tz, tz_label, tz_offset, profile: { display_name }
    } = userData.data.user;
    const doc = new UserModel({
      _id: `${com.teamId}-${com.userId}`,
      team_id: com.teamId,
      user_id: com.userId,
      real_name: name,
      display_name,
      tz,
      tz_label,
      tz_offset,
      role: is_admin ? 'admin' : 'user'
    });
    await doc.save();
    await chatPostMarkdown(com.userId, '>You have successfully registered :tada:');
  } else {
    await chatPostMarkdown(com.userId, '>You are already registered :robot_face:');
  }
}

import { envBasedName, messageToJson, userUpdatedTopic } from '../pubsub';
import { getContactIdByEmail, removeUserFromList, updateUserContact } from '../mailing';

const worker = {
  topic: userUpdatedTopic.name,
  subscription: envBasedName('user-updated-mailing'),
  handler: async (message, log) => {
    const data = messageToJson(message);
    try {
      const lists = ['85a1951f-5f0c-459f-bf5e-e5c742986a50'];
      if (!data.newProfile.acceptedMarketing) {
        const contactId = await getContactIdByEmail(data.user.email);
        if (contactId) {
          try {
            await removeUserFromList('53d09271-fd3f-4e38-ac21-095bf4f52de6', contactId);
          } catch (err) {
            log.warn({ messageId: message.id, err, userId: data.user.id }, 'failed to remove user from newsletter list');
          }
        }
      } else {
        lists.push('53d09271-fd3f-4e38-ac21-095bf4f52de6');
      }
      await updateUserContact(data.newProfile, data.user.email, lists);
      message.ack();
    } catch (err) {
      log.error({ messageId: message.id, err, userId: data.user.id }, 'failed to update user to mailing list');
      message.nack();
    }
  },
};

export default worker;

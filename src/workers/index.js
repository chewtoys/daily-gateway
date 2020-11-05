import { pubsub } from '../pubsub';
import updateMailingList from './updateMailingList';
import updateReputation from './updateReputation';
import config from '../config';

const initializeWorker = async (worker, log) => {
  const topic = pubsub.topic(worker.topic);
  const subscription = topic.subscription(worker.subscription);
  if (subscription.get) {
    await subscription.get({ autoCreate: true });
  }
  log.info(`waiting for messages in ${topic.name}`);
  subscription.on('message', (message) => worker.handler(message, log));
};

// eslint-disable-next-line import/prefer-default-export
export const startWorkers = async (log) => {
  if (config.env === 'production') {
    await initializeWorker(updateMailingList, log);
    await initializeWorker(updateReputation, log);
  }
};

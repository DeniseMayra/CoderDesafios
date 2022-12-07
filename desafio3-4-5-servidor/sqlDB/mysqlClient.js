import createKnexClient from 'knex';
import { mySqlConfig } from './config.js';

export const sqlClient = createKnexClient(mySqlConfig)
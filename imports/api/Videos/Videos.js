/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Videos = new Mongo.Collection('Videos');

Videos.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Videos.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Videos.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this video belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this video was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this video was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the video.',
  },
  url: {
    type: String,
    label: 'The body of the video',
  },
  rating: {
    type: String,
    label: 'The body of the videos.',
  },
});

Videos.attachSchema(Videos.schema);

export default Videos;

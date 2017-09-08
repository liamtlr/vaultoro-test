
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { parseUrl, removedAdditionalParams } from './helpers'
import Videos from './Videos';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'videos.insert': function videosInsert(vid) {
    check(vid, {
      title: String,
      url: String,
      rating: String,
    });
    vid.url = parseUrl(vid.url)
    try {
      return Videos.insert({ owner: this.userId, ...vid });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'videos.update': function videosUpdate(vid) {
    check(vid, {
      _id: String,
      title: String,
      body: String,
      rating: String,
    });

    try {
      const videoId = vid._id;
      Videos.update(videoId, { $set: vid });
      return videoId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'videos.remove': function videosRemove(videoId) {
    check(videoId, String);
    try {
      return Videos.remove(videoId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'videos.insert',
    'videos.update',
    'videos.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

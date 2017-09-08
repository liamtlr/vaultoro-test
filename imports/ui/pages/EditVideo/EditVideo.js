import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Videos from '../../../api/Videos/Videos';
import VideoEditor from '../../components/VideoEditor/VideoEditor';
import NotFound from '../NotFound/NotFound';

const EditVideo = ({ vid, history }) => (vid ? (
  <div className="EditVideo">
    <h4 className="page-header">{`Editing "${vid.title}"`}</h4>
    <VideoEditor doc={vid} history={history} />
  </div>
) : <NotFound />);

EditVideo.defaultProps = {
  vid: null,
};

EditVideo.propTypes = {
  vid: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const videoId = match.params._id;
  const subscription = Meteor.subscribe('videos.view', videoId);

  return {
    loading: !subscription.ready(),
    vid: Videos.findOne(videoId),
  };
}, EditVideo);

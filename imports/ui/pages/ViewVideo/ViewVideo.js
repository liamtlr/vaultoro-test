import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Videos from '../../../api/Videos/Videos';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import { getStarRating } from '../../../modules/helpers.js'


const handleRemove = (videoId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('videos.remove', videoId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Video deleted!', 'success');
        history.push('/videos');
      }
    });
  }
};

const renderVideo = (vid, match, history) => (vid ? (
  <div className="ViewVideo">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ vid && vid.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(vid._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <iframe
      width="560"
      height="315"
      src={vid.url}
      frameBorder="0"
      allowFullScreen>
    </iframe>
    <h4> Rating: {getStarRating(vid.rating)} </h4>
  </div>
) : <NotFound />);

const ViewVideo = ({ loading, vid, match, history }) =>
(
  !loading ? renderVideo(vid, match, history) : <Loading />
);

ViewVideo.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const videoId = match.params._id;
  const subscription = Meteor.subscribe('videos.view', videoId);

  return {
    loading: !subscription.ready(),
    vid: Videos.findOne(videoId),
  };
}, ViewVideo);

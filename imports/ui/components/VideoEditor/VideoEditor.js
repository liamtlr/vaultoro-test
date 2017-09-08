/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class VideoEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        url: {
          required: true,
        },
        rating: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        url: {
          required: 'This thneeds a url, please.',
        },
        rating: {
          required: 'Rate this mutha.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingVideo = this.props.vid && this.props.vid._id;
    const methodToCall = existingVideo ? 'videos.update' : 'videos.insert';
    const vid = {
      title: this.title.value.trim(),
      url: this.url.value.trim(),
      rating: this.rating.value,
    };

    if (existingVideo) vid._id = existingVideo;

    Meteor.call(methodToCall, vid, (error, videoId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingVideo ? 'Video updated!' : 'Video added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/videos/${videoId}`);
      }
    });
  }

  render() {
    const { vid } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={vid && vid.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>URL</ControlLabel>
        <textarea
          className="form-control"
          name="url"
          ref={url => (this.url = url)}
          defaultValue={vid && vid.url}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Rating</ControlLabel>
        <input
          type="number"
          className="form-control"
          min="1"
          max="5"
          name="rating"
          ref={rating => (this.rating = rating)}
          defaultValue={vid && vid.rating}
          placeholder="<3 Videos"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {vid && vid._id ? 'Save Changes' : 'Add Video'}
      </Button>
    </form>);
  }
}

VideoEditor.defaultProps = {
  vid: { title: '', url: '' },
};

VideoEditor.propTypes = {
  vid: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default VideoEditor;

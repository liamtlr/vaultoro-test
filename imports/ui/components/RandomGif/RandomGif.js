/* eslint-disable max-len, no-return-assign */
import React from 'react';

import './RandomGif.scss';

class RandomGif extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gifUrl: null,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let output;
    const apiKey =  Meteor.settings.public.GIPHY_API_KEY
    const apiUrl = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=&rating=R"
    const result = HTTP.call('GET', apiUrl, function(error, response){
      output = response.data.data.fixed_height_small_url
      this.setState({gifUrl: output})
    }.bind(this));
  }

  render() {
    return (
      <div className="gif-holder">
        <img className="random-gif" src={this.state.gifUrl} />
      </div>
    )
  }
};

export default RandomGif;

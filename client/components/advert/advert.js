import React, { Component, PropTypes } from 'react';

class GoogleAd extends Component {
  static propTypes = {
    client: PropTypes.string,
    slot: PropTypes.string,
    format: PropTypes.string,
    wrapperDivStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props.client);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins className="adsbygoogle"
        style={{ 'display': 'block' }}
        ref="adsbygoogle"
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-format={this.props.format}
      >
      </ins>
    );
  }
}
export default GoogleAd;

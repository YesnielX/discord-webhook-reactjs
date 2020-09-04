import React, { PureComponent } from "react";
import "./SaveURL.styles.css";
import URL_Service from '../../Services/URL_Service'

class SaveURL extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      success: false,
      URL: URL_Service.getURL(),
    };
    this.updateURL = this.updateURL.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  updateURL(e) {
    e.preventDefault();
    this.setState({ URL: e.target.value });
  }

  getURL(e) {
    e.preventDefault();
    if(this.state.URL.length > 0) {
      URL_Service.setURL(this.state.URL);
      this.setState({
        success: true
      });
      setTimeout(() => {
        this.setState({
          success: false
        })
      }, 3000);
  
    } else {
      this.setState({
        hasError: true
      })
      setTimeout(() => {
        this.setState({
          hasError: false
        })
      }, 2000);
    }
  }

  render() {

    return (
      <div>
        <div
          className={`fade ${this.state.hasError && 'alert alert-danger show'}`}>
          <strong>Something went wrong: URL invalid.</strong>
        </div>
        <div
          className={`fade ${this.state.success && 'alert alert-info show'}`}>
          <strong>URL Saved</strong>
        </div>
        <form onSubmit={this.getURL}>
          <div className="form-group">
            <label><h2>WebHook URL</h2></label>
            <input
              type="URL"
              className="form-control text-center"
              onChange={this.updateURL}
              value={this.state.URL}
              placeholder="WebHook URL"
            />
            <button type="submit" className="btn btn-outline-primary mt-1">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SaveURL;

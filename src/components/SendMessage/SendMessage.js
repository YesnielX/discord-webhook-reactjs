import React, { PureComponent } from "react";
import "./SendMessage.styles.css";
import SendMessageService from "../../Services/SendMessageService/";

class SendMessage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      success: false,
      Type: "simple",
      Username: "React Discord WebHook",
      AvatarURL: "",
      EmbedTitle: "",
      EmbedImageURL: "",
      Message: "Test Message",
      PreviewColor: "#07eaed",
      MessageColor: "649452",
      submits: 0
    };

    this.updateTypeMessage = this.updateTypeMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateAvatarURL = this.updateAvatarURL.bind(this);
    this.updateEmbedTitle = this.updateEmbedTitle.bind(this);
    this.updateEmbedImageURL = this.updateEmbedImageURL.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateColor = this.updateColor.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  render() {
    return (
      <div className="sendMessage p-5">
        <form onSubmit={this.sendMessage}>
          <div className="form-group">
            <label>
              <h2>Send Message</h2>
            </label>
            <div className="form-group">
              <label>Select Message Type</label>
              <select
                className="form-control"
                value={this.state.Type}
                onChange={this.updateTypeMessage}
              >
                <option value="simple">Simple Message</option>
                <option value="embed">Embed Message</option>
              </select>
            </div>

            <div className="form-group">
              {this.state.hasError ? (
                <div className="alert alert-danger show">
                  <strong>Something went wrong: Message Empty.</strong>
                </div>
              ) : (
                ""
              )}
              {this.state.success ? (
                <div className="alert alert-info collapse.show">
                  <strong>Message Sended, View discord!</strong>
                </div>
              ) : (
                ""
              )}
              {this.state.submits > 5 ? (
                <div className={`fade ${this.state.submits > 5 && "alert alert-danger show"}`}>
                  <strong>
                    Something went wrong: Wait a time to re-send another
                    message.
                  </strong>
                </div>
              ) : (
                ""
              )}
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                defaultValue={this.state.Username}
                onChange={this.updateUsername}
              />
              <label>Avatar URL</label>
              <input
                className="form-control"
                type="text"
                value={this.state.AvatarURL}
                onChange={this.updateAvatarURL}
              />
                {this.state.Type === "embed" ? (
                  <div className="fade show">
                    <label>Embed Title</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.EmbedTitle}
                      onChange={this.updateEmbedTitle}
                      required
                    />
                    <label>Embed Image</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.EmbedImageURL}
                      onChange={this.updateEmbedImageURL}
                      required
                    />
                  </div>
                ) : (
                  ""
                )}

              <label>Message</label>
              <textarea
                className="form-control"
                rows="3"
                defaultValue={this.state.Message}
                onChange={this.updateMessage}
                required
              ></textarea>
            </div>
            <div
              className={`d-none ${
                this.state.Type === "embed" && "d-inline-flex p-2 show"
              }`}
            >
              <div>
                <label>Select Color Embed</label>
                <span className="color-picker">
                  <span
                    className="circle"
                    style={{ backgroundColor: this.state.PreviewColor }}
                  ></span>
                  <input
                    className="hidden"
                    type="color"
                    onChange={this.updateColor}
                  />
                  <p>{this.state.PreviewColor}</p>
                </span>
              </div>
            </div>
            <div>
              <small className="text-muted">
                <button className="btn btn-outline-success" type="submit">
                  Send Message
                </button>
              </small>
            </div>
          </div>
        </form>
      </div>
    );
  }

  updateTypeMessage(e) {
    e.preventDefault();
    this.setState({
      Type: e.target.value,
    });
  }

  updateUsername(e) {
    e.preventDefault();
    this.setState({
      Username: e.target.value,
    });
  }

  updateAvatarURL(e) {
    e.preventDefault();
    this.setState({
      AvatarURL: e.target.value,
    });
  }

  updateEmbedTitle(e) {
    e.preventDefault();
    this.setState({
      EmbedTitle: e.target.value,
    });
  }

  updateEmbedImageURL(e) {
    e.preventDefault();
    this.setState({
      EmbedImageURL: e.target.value
    });
  }

  updateMessage(e) {
    e.preventDefault();
    this.setState({
      Message: e.target.value,
    });
  }

  updateColor(e) {
    e.preventDefault();
    this.setState({
      PreviewColor: e.target.value,
      MessageColor: parseInt(e.target.value.replace("#", ""), 16),
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.setState({
      submits: this.state.submits + 1,
    });

    if (this.state.submits > 4) {
      setTimeout(() => {
        this.setState({
          submits: 0,
        });
      }, 5000);
      return;
    }
    if (this.state.Message.length > 0) {
      this.setState({
        success: true,
      });
      setTimeout(() => {
        this.setState({
          success: false,
        });
      }, 3000);
      switch (this.state.Type) {
        case "embed": {
          SendMessageService.sendEmbedMessageToDiscord(
            this.state.Username,
            this.state.AvatarURL,
            this.state.EmbedTitle,
            this.state.EmbedImageURL,
            this.state.Message,
            this.state.MessageColor
          );
          break;
        }
        case "simple": {
          SendMessageService.sendSimpleMessageToDiscord(
            this.state.Username,
            this.state.AvatarURL,
            this.state.Message
          );
          break;
        }

        default:
          break;
      }
    } else {
      this.setState({
        hasError: true,
      });
      setTimeout(() => {
        this.setState({
          hasError: false,
        });
      }, 2000);
    }
  }
}

export default SendMessage;

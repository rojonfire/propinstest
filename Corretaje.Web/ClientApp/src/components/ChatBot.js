/** @format */

import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import api from '../api';
import icon from '../utils/images';

const BotReply = ({ message }) => {
  return (
    <div className="chat-support">
      <div className="cont-foto">
        <img src={icon.iconRobot} alt="" />
      </div>
      <div className="chat-text">
        {message.includes('{contacto}') ? (
          <span className="badges">
            Queremos ayudarte a resolver todas tus dudas, por favor ingresa a{' '}
            <a href="/contacto">contacto</a> y nos comunicaremos contigo.
          </span>
        ) : (
          <span className="badges">{message}</span>
        )}
      </div>
    </div>
  );
};

const UserReply = ({ message }) => {
  return (
    <div className="chat-usuario">
      <div className="chat-text">
        <span className="badges">{message}</span>
      </div>
    </div>
  );
};

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBot: false,
      loading: false,
      botMsg: '',
      usrMsg: '',
      chatMsg: [
        {
          type: 'bot',
          message: (
            <BotReply message={'Hola, ¿Tienes dudas? Te podemos ayudar'} />
          ),
          order: 0
        }
      ]
    };
  }

  openchatBot = () => {
    const { showChatBot } = this.state;
    this.setState(
      {
        showChatBot: !showChatBot
      },
      () => {
        if (!showChatBot) {
          this.input.focus();
        }
      }
    );
  };

  sendMessage = async () => {
    const { loading } = this.state;

    if (loading) return;
    let { chatMsg, usrMsg } = this.state;
    let order = 0;
    chatMsg.map(next => {
      if (next.order > order) {
        order = next.order;
      }
      return null;
    });
    if (usrMsg === null || usrMsg.match(/^ *$/) !== null) {
      this.setState({
        loading: false
      });
      return;
    }

    const newMsg = {
      type: 'user',
      message: <UserReply message={usrMsg} />,
      order: order + 1
    };
    chatMsg.push(newMsg);
    this.setState(
      {
        loading: true,
        chatMsg: chatMsg,
        usrMsg: ''
      },
      async () => {
        try {
          const resp = await api.botQnAReply(usrMsg);
          const botResp = resp.answers[0].answer;

          const newMsgBot = {
            type: 'bot',
            message: <BotReply message={botResp} />,
            order: newMsg.order + 1
          };

          chatMsg.push(newMsgBot);

          this.setState(
            {
              loading: false,
              chatMsg: chatMsg
            },
            () => {
              const d = document.getElementById('chatBotBody');
              if (d !== null && !/Edge/.test(navigator.userAgent)) {
                d.scrollTo(0, 99999);
              }
            }
          );
        } catch (error) {
          this.setState({
            loading: false,
            usrMsg: ''
          });
          console.error('error: ', error);
        }
      }
    );
  };

  setMessage = message => {
    this.setState({
      usrMsg: message
    });
  };

  checkEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  render() {
    const { loading, chatMsg, usrMsg, showChatBot } = this.state;
    return (
      <React.Fragment>
        <section>
          {!showChatBot ? (
            <div onClick={this.openchatBot} className="modal-chat shadow">
              <img src={icon.imgChat} alt="" />
            </div>
          ) : (
            <div onClick={this.openchatBot} className="modal-chat shadow">
              <img src={icon.imgChatClose} alt="" />
            </div>
          )}
        </section>
        {showChatBot && (
          <div className="chat-bot">
            <Card className="shadow">
              <Card.Header>
                <h6 className="small text-center">Iniciar una conversación</h6>
              </Card.Header>
              <Card.Body id={'chatBotBody'}>
                <div className="cont-chat" />
                {chatMsg.map((object, i) => (
                  <div key={i}>{object.message}</div>
                ))}
                {loading && (
                  <div className="loading">
                    <img src={icon.loadingChat} alt="" />
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                <textarea
                  name="userMsg"
                  ref={i => (this.input = i)}
                  placeholder="Enviar un mensaje..."
                  rows="2"
                  onChange={e => this.setMessage(e.target.value)}
                  value={usrMsg}
                  onKeyDown={e => this.checkEnter(e)}
                />
                <Button>
                  <img
                    src={icon.iconSend}
                    alt=""
                    onClick={() => {
                      this.sendMessage();
                    }}
                  />
                </Button>
              </Card.Footer>
            </Card>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default ChatBot;

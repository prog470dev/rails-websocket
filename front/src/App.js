import React from "react";
import Actioncable from "actioncable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.handleClick = this.handleClick.bind(this);

    // websocketの設定
    this.endpoint = "ws:localhost:3000/cable";
    this.cable = Actioncable.createConsumer(this.endpoint);
    // 購読するチャネルの設定
    this.chatChannel = this.cable.subscriptions.create(
      {
        // チャネル(=Rails側のチャネルクラス名)の指定
        channel: "BroadcastChannel",
      },
      {
        // チャネルとの接続が確立した時に実行される処理
        connected: () => {
          console.log("connected.");
        },
        // チャネルからメッセージを購読した時に実行される処理
        received: (data) => {
          this.setState({
            messages: [...this.state.messages, data],
          });
        },
      }
    );
  }

  handleClick() {
    // Rails側のチャネルクラスで定義されたメソッドを指定することでメッセージ送信
    // 送信データは object（ハッシュ形式）
    this.chatChannel.perform("speak", {
      message: "hoge",
    });
  }

  render() {
    const items = this.state.messages.map((message, i) => {
      return <li key={i}>{message}</li>;
    });
    return (
      <div>
        <button onClick={this.handleClick}>message</button>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default App;

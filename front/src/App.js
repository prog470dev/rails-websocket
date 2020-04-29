import React from "react";
import Actioncable from "actioncable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputId: 0,
      inputTo: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickStreamChange = this.handleClickStreamChange.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);

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
    this.notificationChannel = null;
  }

  handleClick() {
    // Rails側のチャネルクラスで定義されたメソッドを指定することでメッセージ送信
    // 送信データは object（ハッシュ形式）
    this.chatChannel.perform("speak", {
      message: "hoge",
    });
  }

  handleClickStreamChange() {
    // 変更前に使用していたチャンネルの購読を終了
    if (this.notificationChannel != null) {
      this.notificationChannel.unsubscribe();
    }

    // idと対応したストリームを指定してチャネルの購読を確立
    this.notificationChannel = this.cable.subscriptions.create(
      {
        channel: "NotificationChannel",
        id: this.state.inputId,
      },
      {
        connected: () => {
          console.log("connected to NotificationChannel");
        },
        received: (data) => {
          this.setState({
            messages: [...this.state.messages, data],
          });
        },
      }
    );
  }

  handleClickPost() {
    const url = "http://localhost:3000/notifications";
    const data = { to: this.state.inputTo };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
  }

  handleChangeId(e) {
    this.setState({ inputId: e.target.value });
  }

  handleChangeTo(e) {
    this.setState({ inputTo: e.target.value });
  }

  render() {
    const items = this.state.messages.map((message, i) => {
      return <li key={i}>{message}</li>;
    });
    return (
      <div>
        <input
          type="text"
          value={this.state.inputId}
          onChange={this.handleChangeId}
        />
        <button onClick={this.handleClickStreamChange}>change stream</button>
        <input
          type="text"
          value={this.state.inputTo}
          onChange={this.handleChangeTo}
        />
        <button onClick={this.handleClickPost}>post</button>
        <button onClick={this.handleClick}>message</button>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default App;

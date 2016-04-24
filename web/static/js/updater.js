import {Socket} from "phoenix";

export default function updater(renderIncrement, username, updateUserData, updateInCyclePlayers){
  let socket = new Socket("/socket", {params: {token: window.userToken}});
  socket.connect();

  let channel = socket.channel("the_counter", {username: username});

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully as " + username + " get ready to increment some counters", resp); })
    .receive("error", resp => { console.log("Unable to join you are missing out on a world of fun", resp); });

  channel.onClose(event => {
    console.log('Channel closed.');
  });

  channel.on("timer", payload => {
    renderIncrement(payload);
    console.log("Increment message received");
  });

  channel.on("update-user-data", payload => {
    console.log("updating user data message received");
    console.log(payload);
    updateUserData(payload);
  });

  channel.on("update-in-cycle-players", payload => {
    console.log("In updating cyclers");
    console.log(payload);
    updateInCyclePlayers(payload);
  });

  const close = () => socket.disconnect();

  const send = (data) => {
    console.log("FINISHING THE GAME");
    channel.push("finished-game-data", {username: username, data: data});
  };

  const togglePlayCycle = (bool) => {
    channel.push("toggle-play-cycle", {username: username, bool: bool});
  };

  return {close: close, send: send, togglePlayCycle: togglePlayCycle};
}

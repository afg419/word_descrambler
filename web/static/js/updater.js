import {Socket} from "phoenix";

export default function updater(opts){
  let socket = new Socket("/socket", {params: {token: window.userToken}});
  socket.connect();

  let channel = socket.channel("the_counter", {username: opts.username});

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully as " + opts.username + " get ready to increment some counters", resp); })
    .receive("error", resp => { console.log("Unable to join you are missing out on a world of fun", resp); });

  channel.onClose(event => {
    console.log('Channel closed.');
  });

  channel.on("timer", payload => {
    opts.renderIncrement(payload);
  });

  channel.on("update-user-data", payload => {
    opts.updateUserData(payload);
  });

  channel.on("update-in-cycle-players", payload => {
    opts.updateInCyclePlayers(payload);
  });

  const close = () => socket.disconnect();

  const send = (data) => {
    channel.push("finished-game-data", {username: opts.username, data: data});
  };

  const togglePlayCycle = (bool) => {
    channel.push("toggle-play-cycle", {username: opts.username, bool: bool});
  };

  return {close: close, send: send, togglePlayCycle: togglePlayCycle};
}

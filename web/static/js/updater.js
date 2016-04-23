import {Socket} from "phoenix";

export default function updater(renderIncrement, username, updateUserData){
  let socket = new Socket("/socket", {params: {token: window.userToken}});
  socket.connect();

  let channel = socket.channel("the_counter", {username: username});

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully get ready to increment some counters", resp); })
    .receive("error", resp => { console.log("Unable to join you are missing out on a world of fun", resp); });

  channel.onClose(event => console.log('Channel closed.'));

  channel.on("count_up", payload => {
    renderIncrement(payload.body);
    console.log("Increment message received");
  });

  channel.on("timer", payload => {
    renderIncrement(payload);
    console.log("Increment message received");
  });

  channel.on("update-user-data", payload => {
    console.log(payload);
    updateUserData(payload);
    console.log("updating user data message received");
  });

  channel.on("toggled-play-cycle", payload => {
    console.log(payload);
    console.log("toggled in game cycle");
  });

  channel.on("in-cycle-players", payload => {
    debugger;
    console.log(payload);
    console.log("look at all the in cycle players!");
  });

  const close = () => socket.disconnect();

  const send = (data) => {
    channel.push("finished-game-data", {username: username, data: data});
  };

  const togglePlayCycle = (bool) => {
    console.log("trying to make the player ingamecycle == "+bool)
    channel.push("toggle-play-cycle", {username: username, bool: bool});
  };

  return {close: close, send: send, togglePlayCycle: togglePlayCycle};
}

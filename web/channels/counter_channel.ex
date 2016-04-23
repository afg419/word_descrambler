defmodule WordScram.CounterChannel do
  use Phoenix.Channel
  alias WordScram.Counter
  alias WordScram.Repo
  alias WordScram.User

  def join("the_counter", _msg, socket) do
    {:ok, socket}
  end

  def handle_in("finished-game-data", %{"username" => username, "data" => data}, socket) do
    user = Repo.get_by(User, username: username)
    {:ok, user} = User.played_game(user, data["score"])

    push(socket, "update-user-data", User.to_json(user))
    {:noreply, socket}
  end

  def handle_in("toggle-play-cycle", %{"username" => username, "bool" => bool}, socket) do
    user = Repo.get_by(User, username: username)
            |> User.toggle_play_cycle(bool)

    users = User.all_in_play_cycle
            |> Enum.map(fn user -> User.to_json(user) end)

    broadcast!(socket, "toggled-play-cycle", %{users: users})
    {:noreply, socket}
  end
end

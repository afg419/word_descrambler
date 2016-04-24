require IEx

defmodule WordScram.CounterChannel do
  use Phoenix.Channel
  alias WordScram.Counter
  alias WordScram.Repo
  alias WordScram.User

  def join("the_counter", %{"username" => username}, socket) do
    socket = assign(socket, :current_username, username)
    {:ok, socket}
  end

  def handle_in("finished-game-data", %{"username" => username, "data" => data}, socket) do
    {:ok, user} = User.played_game(current_user(socket), data["score"])

    push(socket, "update-user-data", User.to_json(user))
    update_in_cycle_players(socket)

    {:noreply, socket}
  end

  def handle_in("toggle-play-cycle", %{"username" => username, "bool" => bool}, socket) do
    current_user(socket)
      |> User.toggle_play_cycle(bool)

    update_in_cycle_players(socket)

    {:noreply, socket}
  end

  def terminate(reason, socket) do
    IO.puts("TERMINATED")

    current_user(socket)
      |> User.toggle_play_cycle(false)

    update_in_cycle_players(socket)

    :ok
  end

  def current_user(socket) do
    Repo.get_by(User, username: socket.assigns.current_username)
  end

  def update_in_cycle_players(socket) do
    IO.puts("ATTEMPTING TO UPDATE PLAYERs IN CYCLE")

    users = User.all_in_play_cycle
            |> Enum.map(fn user -> User.to_json(user) end)
    broadcast!(socket, "update-in-cycle-players", %{users: users})
  end
end

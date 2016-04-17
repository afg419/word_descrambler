defmodule WordScram.UserSocket do
  use Phoenix.Socket

  channel "the_counter", WordScram.CounterChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end

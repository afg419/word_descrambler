defmodule WordScram.CounterController do
  use WordScram.Web, :controller
  alias WordScram.Counter

  def index(conn, _params) do
    render( conn, "index.html", counter: Repo.get(Counter, 1) )
  end
end

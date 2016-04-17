defmodule WordScram.AppState do
  use WordScram.Web, :controller

  def current_user(conn) do
    if id = get_session(conn, :user_id) do
      Repo.get!(WordScram.User, id)
    end
  end
end

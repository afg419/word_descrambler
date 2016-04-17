require IEx

defmodule CountServer.SessionController do
  use CountServer.Web, :controller

  alias CountServer.Repo
  alias CountServer.User
  alias CountServer.AppState

  alias Comeonin.Bcrypt

  def index(conn, _params) do
    user = conn
      |> fetch_session
      |> AppState.current_user

    case user do
      nil  -> render(conn, reply: false)
      user -> render(conn, reply: User.to_json(user))
    end
  end

  def new(conn, %{"password" => password, "username" => username}) do
    changeset = %User{}
    |> User.changeset(%{password: Bcrypt.hashpwsalt(password), username: username})

    fetched_conn = fetch_session(conn)

    case Repo.insert(changeset) do
      {:ok, user}          -> login(user, fetched_conn)
      {:error, changeset}  -> render(fetched_conn, reply: false)
    end
  end

  def create(conn, %{"password" => password, "username" => username}) do
    user = Repo.get_by(User, username: username)
    fetched_conn = fetch_session(conn)

    case authenticate(user, password) do
      false -> render(fetched_conn, reply: false)
      true  -> login(user, fetched_conn)
    end
  end

  def destroy(conn, _params) do
    fetched_conn = conn
    |> fetch_session
    |> put_session(:user_id, nil)

    case AppState.current_user(fetched_conn) do
      nil  -> render(fetched_conn, reply: true)
      user -> render(fetched_conn, reply: false)
    end
  end

###############################################################################

  defp authenticate(user, password) do
    case user do
      nil -> false
      user -> Bcrypt.checkpw(password, user.password)
    end
  end

  defp login(user, fetched_conn) do
    json_user = User.to_json(user)
    fetched_conn
    |> put_session(:user_id, user.id)
    |> render(reply: json_user)
  end
end

require IEx

defmodule WordScram.User do
  use WordScram.Web, :model
  alias WordScram.Repo

  schema "users" do
    field :username, :string
    field :password, :string
    field :top_score, :integer, default: 0
    field :avg_score, :integer, default: 0
    field :total_wins, :integer, default: 0
    field :total_plays, :integer, default: 0
    field :in_play_cycle, :boolean, default: false

    timestamps
  end

  @required_fields ~w(username password)
  @optional_fields ~w(top_score avg_score total_plays total_wins in_play_cycle)

  def all_in_play_cycle do
    Repo.all(from u in WordScram.User, where: u.in_play_cycle == true, select: u)
  end

  def to_json(user) do
    %{username: user.username,
            id: user.id,
   total_plays: user.total_plays,
     top_score: user.top_score,
     avg_score: user.avg_score,
 in_play_cycle: user.in_play_cycle}
  end

  def toggle_play_cycle(user, bool) do
    WordScram.User.changeset(user, %{in_play_cycle: bool})
    |> Repo.update
  end

  def get_avg(user, score) do
    if user.total_plays == 0 do
      score
    else
      (user.avg_score * user.total_plays + score)/(user.total_plays+1)
    end
  end

  def played_game(user, score) do
    total_plays = user.total_plays + 1
    top_score = Enum.max([score, user.top_score || 0])
    avg_score = get_avg(user, score)
    WordScram.User.changeset(user, %{total_plays: total_plays,
                                       top_score: top_score,
                                        avg_score: avg_score})
    |> Repo.update
  end

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:username)
  end
end

defmodule WordScram.Counter do
  use WordScram.Web, :model
  alias WordScram.Repo

  schema "counters" do
    field :main, :integer, default: 0
    field :active_game, :boolean, default: false

    timestamps
  end

  @required_fields ~w(main active_game)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def update(counter) do
    if counter.main > timer(counter) do
      game_active = !counter.active_game
      WordScram.Counter.changeset(counter, %{main: 1, active_game: game_active})
      |> Repo.update
    else
      increment(counter)
    end
  end

  def to_json(counter) do
    %{main: counter.main, active_game: counter.active_game}
  end

  def increment(counter) do
    set(counter, counter.main + 1)
  end

  def set(counter, value) do
    WordScram.Counter.changeset(counter, %{main: value})
    |> Repo.update
  end

  def timer(counter) do
    case counter.active_game do
      true -> 4
      false -> 9
    end
  end

end

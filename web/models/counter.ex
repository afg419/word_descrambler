defmodule WordScram.Counter do
  use WordScram.Web, :model
  alias WordScram.Repo
  alias WordScram.Letters

  schema "counters" do
    field :main, :integer, default: 0
    field :active_game, :boolean, default: false
    field :letters, :string, default: ""
    field :game_end_time, :integer, default: 30
    field :lobby_end_time, :integer, default: 15

    timestamps
  end

  @required_fields ~w(main active_game)
  @optional_fields ~w(letters game_end_time lobby_end_time)

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def update(counter) do
    if counter.main > timer(counter) do
      game_active = !counter.active_game
      WordScram.Counter.changeset(counter, %{main: 1, active_game: game_active, letters: Letters.generate_letters})
      |> Repo.update
    else
      increment(counter)
    end
  end

  def processed_letters(counter) do
    String.codepoints(counter.letters)
  end

  def to_json(counter) do
    %{
                 main: counter.main,
          active_game: counter.active_game,
              letters: processed_letters(counter),
        game_end_time: counter.game_end_time,
       lobby_end_time: counter.lobby_end_time
    }
  end

  def increment(counter) do
    WordScram.Counter.changeset(counter, %{main: counter.main+1})
    |> Repo.update
  end

  def timer(counter) do
    case counter.active_game do
      true -> (counter.game_end_time - 1)
      false -> (counter.lobby_end_time - 1)
    end
  end
end

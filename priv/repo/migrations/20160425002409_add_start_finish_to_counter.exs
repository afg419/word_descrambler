defmodule WordScram.Repo.Migrations.AddStartFinishToCounter do
  use Ecto.Migration

  def change do
    alter table(:counters) do
      add :game_end_time, :integer, default: 30
      add :lobby_end_time, :integer, default: 15
    end
  end
end

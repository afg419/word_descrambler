defmodule WordScram.Repo.Migrations.AddGameStateToCounter do
  use Ecto.Migration

  def change do
    alter table(:counters) do
      add :active_game, :boolean, default: false
    end
  end
end

defmodule WordScram.Repo.Migrations.AddGameAttrsToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :avg_score, :integer, default: 0
      add :total_wins, :integer, default: 0
      add :total_plays, :integer, default: 0
    end
  end
end

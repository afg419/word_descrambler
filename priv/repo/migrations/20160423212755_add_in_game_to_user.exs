defmodule WordScram.Repo.Migrations.AddInGameToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :in_play_cycle, :boolean, default: false
    end
  end
end

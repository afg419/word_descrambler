defmodule WordScram.Repo.Migrations.AddLettersToCounter do
  use Ecto.Migration

  def change do
    alter table(:counters) do
      add :letters, :string, default: ""
    end
  end
end

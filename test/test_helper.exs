Application.ensure_all_started(:hound)
ExUnit.start

Mix.Task.run "ecto.create", ~w(-r WordScram.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r WordScram.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(WordScram.Repo)

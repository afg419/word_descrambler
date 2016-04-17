use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :word_scram, WordScram.Endpoint,
  http: [port: 4001],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :word_scram, WordScram.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "aarongreenspan",
  password: "aarongreenspan",
  database: "count_server_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

defmodule WordScram.CounterIncrementer do
  alias WordScram.Repo
  alias WordScram.Counter

  def start_link do
    pid = spawn_link __MODULE__, :loop, []
    {:ok, pid}
  end

  def loop do
    {:ok, counter} = Repo.get!(Counter, 1)
      |> Counter.update
      
    WordScram.Endpoint.broadcast! "the_counter", "timer", Counter.to_json(counter)

    IO.puts counter.main

    :timer.sleep(1000)
    loop
  end
end

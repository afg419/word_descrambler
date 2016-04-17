defmodule WordScram.CounterTest do
  use WordScram.ModelCase

  alias WordScram.Counter

  @valid_attrs %{main: 42}

  test "changeset with valid attributes" do
    changeset = Counter.changeset(%Counter{}, @valid_attrs)
    assert changeset.valid?
  end
end

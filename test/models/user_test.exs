defmodule WordScram.UserTest do
  use WordScram.ModelCase

  alias WordScram.User
  alias WordScram.Repo

  @valid_attrs %{username: "axeface", password: "password"}
  @invalid_attrs %{}

    test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, %{username: "axeface"})
    refute changeset.valid?

    changeset = User.changeset(%User{}, %{password: "password"})
    refute changeset.valid?

    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset is invalid if username is used already" do
    %User{}
    |> User.changeset(@valid_attrs)
    |> Repo.insert!

    user2 =
      %User{}
      |> User.changeset(%{username: "axeface", password: "password2"})
    assert {:error, changeset} = Repo.insert(user2)
    assert changeset.errors[:username] == "has already been taken"
  end

  test "user has default 0 game attrs" do
    # changeset = User.changeset(%User{}, @valid_attrs)

    user = %User{}
    |> User.changeset(@valid_attrs)
    |> Repo.insert!

    assert user.total_wins == 0
    assert user.total_plays == 0
    assert user.top_score == 0
    assert user.avg_score == 0
  end
end

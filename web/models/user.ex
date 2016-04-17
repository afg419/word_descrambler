defmodule WordScram.User do
  use WordScram.Web, :model

  schema "users" do
    field :username, :string
    field :password, :string
    field :top_score, :integer

    timestamps
  end

  @required_fields ~w(username password)
  @optional_fields ~w()

  def to_json(user) do
    %{username: user.username, id: user.id}
  end

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:username)
  end
end

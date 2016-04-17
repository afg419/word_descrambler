defmodule WordScram.Letters do

  def get_letter do
    :random.seed(:erlang.now)
     Enum.random(Enum.to_list(97..122))
  end

  def get_common_letter do
    :random.seed(:erlang.now)
     Enum.random('aeioust')
  end

  def get_random_letter do
    :random.seed(:erlang.now)
    random = Enum.random([0,1,2])
    if random == 2 do
      get_common_letter
    else
      get_letter
    end
  end

  def generate_letters do
    :random.seed(:erlang.now)

    Enum.to_list(0..9)
    |> Enum.map(fn i -> get_random_letter end)
    |> to_string
  end
end

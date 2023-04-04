import axios from 'axios';

const url = 'http://192.168.100.40:3000/locations';

const getRecipes = async (value?: string) => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      like: value,
    },
  });

  return data;
};

const getRecipesFavorites = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      favorites: true,
    },
  });

  return data;
};

const updateRecipes = async (favorites: boolean, id: string) => {
  const {data} = await axios.patch(`${url}/${id}`, {
    favorites,
  });

  return data;
};

export const locationApi = {
  get: getRecipes,
  getFavorites: getRecipesFavorites,
  update: updateRecipes,
  delete: {},
  post: {},
};

import axios from 'axios';

const url = 'http://192.168.100.40:3000/locations';

const listLocations = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data;
};

const getLocation = async (id?: string) => {
  const {data} = await axios.get(`${url}/${id}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
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

const updateLocation = async (favorite: boolean, id: string) => {
  const {data} = await axios.patch(`${url}/${id}`, {
    favorite,
  });

  return data;
};

export const locationApi = {
  list: listLocations,
  get: getLocation,
  getFavorites: getRecipesFavorites,
  update: updateLocation,
  delete: {},
  post: {},
};

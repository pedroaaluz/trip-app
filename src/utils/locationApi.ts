import axios from 'axios';

const url = 'http://192.168.100.40:3000/locations';

const listLocations = async (filters: Record<string, boolean>) => {
  const filtersToUse = Object.keys(filters).reduce((acc, cr) => {
    const key = cr;

    if (filters[key]) {
      acc.push(key);
    }

    return acc;
  }, [] as string[]);

  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      tag: filtersToUse,
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

const ListLocationsFavorites = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      favorite: true,
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
  listFavorites: ListLocationsFavorites,
  update: updateLocation,
  delete: {},
  post: {},
};

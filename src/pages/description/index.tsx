import React, {useState} from 'react';
import {Box, HStack, Image, Heading, IconButton, Text} from 'native-base';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {locationApi} from '../../utils/locationApi';
import {useQuery} from 'react-query';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Loading from '../../components/Loading/Loading';
import type {LocationInterface} from '../../types/locationType';
import IconCircle from '../../components/IconCircle';
import {useMutation, useQueryClient} from 'react-query';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Menu = ({
  route,
  navigation,
}: NativeStackScreenProps<StackParamsList, 'Description'>): JSX.Element => {
  const queryClient = useQueryClient();

  const {mutate} = useMutation(
    () => locationApi.update(!isFavorite, locationId),
    {
      onSuccess: () => queryClient.invalidateQueries('list-recipes-favorites'),
    },
  );

  //@ts-ignore meaningless error
  const {data, isLoading} = useQuery('get-location', async () => {
    const response = await locationApi.get(locationId);

    return response;
  });

  const location = data as LocationInterface;

  const {locationId} = route.params;
  const [isFavorite, setIsFavorite] = useState<boolean>(location.favorite);

  const getIcon = {
    Religioso: 'book',
    Cultural: 'film',
    Natureza: 'cloud',
    Histórico: 'pen-tool',
    Restaurante: 'coffee',
    Hotel: 'briefcase',
  };

  const color = isFavorite ? '#C2AE00' : '#C2AE00';
  const iconName = isFavorite ? 'star' : 'star-o';

  return (
    <Box flex={1} backgroundColor={'#f6f6f6'}>
      {isLoading ? (
        <Loading count={1} />
      ) : (
        <>
          <HStack
            w="100%"
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={5}
            safeArea
            borderColor={'#6D6D6D'}>
            <IconButton
              borderRadius={20}
              borderWidth={1}
              borderColor={'#6D6D6D'}
              onPress={() => navigation.navigate('Tabs')}
              _icon={{
                name: 'arrow-left',
                as: FeatherIcon,
                size: 5,
                color: '#6D6D6D',
              }}
              variant={'ghost'}
            />
            <Heading>{location.name}</Heading>
            <IconButton
              borderRadius={20}
              borderWidth={1}
              borderColor={'#6D6D6D'}
              _pressed={{
                bg: 'yellow.600:alpha.20',
              }}
              onPress={() => {
                setIsFavorite(!isFavorite);
                mutate();
              }}
              _icon={{
                name: iconName,
                as: FontAwesomeIcon,
                size: 5,
                color: color,
              }}
              variant={'ghost'}
            />
          </HStack>
          <Box padding={5}>
            <Image
              w="100%"
              h={300}
              borderRadius={20}
              source={{uri: location.image}}
              alt={locationId}
            />
          </Box>
          <Box
            justifyContent={'space-between'}
            w="100%"
            flexDirection={'row'}
            padding={5}
            alignItems={'center'}>
            <IconCircle
              header="Funcionamento"
              icon="clock"
              text={`${location.operatingHours.open} - ${location.operatingHours.closed}`}
            />
            <IconCircle
              header="tipo"
              icon={getIcon[location.tag]}
              text={location.tag}
            />
          </Box>

          <Box flexDirection={'column'} padding={5}>
            <Heading marginBottom={3} fontSize={30} bold>
              Sobre
            </Heading>

            <Text>{location.description}</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Menu;

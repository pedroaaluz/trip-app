import React /* , {useState} */ from 'react';
import {
  Box,
  HStack,
  Input,
  Icon,
  Divider,
  Image,
  Heading,
  Text,
} from 'native-base';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {locationApi} from '../../utils/locationApi';
import {useQuery} from 'react-query';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import TagFilter from '../../components/TagFilter';

const Catalog = ({}: /*  navigation, */
NativeStackScreenProps<StackParamsList, 'Description'>): JSX.Element => {
  const {data, isLoading} = useQuery('list-locations', locationApi.get);
  const tagsFilters = [
    {name: 'Religioso', icon: 'book'},
    {name: 'Cultural', icon: 'film'},
    {name: 'Natureza', icon: 'cloud'},
    {name: 'Histórico', icon: 'pen-tool'},
    {name: 'Restaurante', icon: 'coffee'},
    {name: 'Hotel', icon: 'briefcase'},
  ];

  const renderFilters = ({item}) => {
    return <TagFilter name={item.name} icon={item.icon} />;
  };

  const renderLocation = ({item}) => {
    return (
      <Box
        borderTopRadius={10}
        borderColor="#D9D9D9"
        flex={1}
        borderWidth={2}
        marginBottom={5}>
        <Image
          borderTopRadius={10}
          source={{uri: item.image}}
          size={220}
          w="100%"
          alt={item.name}
        />
        <Box padding={6}>
          <Box alignItems="center" marginTop={2} flexDirection={'row'}>
            <Icon
              marginRight={2}
              as={FeatherIcon}
              name={'map-pin'}
              size={5}
              color={'#2C69E0'}
            />
            <Heading>{item.name}</Heading>
          </Box>
          <Text>{item.address}</Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} flexDirection={'column'} backgroundColor={'#f6f6f6'}>
      <HStack
        flexDirection={'column'}
        w="100%"
        justifyContent={'center'}
        safeArea>
        <Heading padding={6} color="#2C69E0">
          Para onde vamos hoje?
        </Heading>
        <Box padding={5}>
          <Input
            color={'#2C69E0'}
            outlineColor={'#2C69E0'}
            focusOutlineColor={'#2C69E0'}
            backgroundColor={'#f6f6f6'}
            variant="outline"
            w="100%"
            paddingX={5}
            rightElement={
              <Icon
                marginRight={6}
                as={FeatherIcon}
                name={'search'}
                size={5}
                color={'#000'}
              />
            }
          />
        </Box>
      </HStack>
      <Box
        flex={1}
        paddingX={5}
        flexDirection={'column'}
        justifyContent={'center'}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderLocation}
        />
      </Box>
    </Box>
  );
};

export default Catalog;

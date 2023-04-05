import React, {useState} from 'react';
import {
  Box,
  HStack,
  Input,
  Icon,
  Image,
  Heading,
  IconButton,
  Text,
  Modal,
  Pressable,
} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {locationApi} from '../../utils/locationApi';
import {useQuery, useQueryClient} from 'react-query';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import TagFilter from '../../components/TagFilter';
import Loading from '../../components/Loading/Loading';
import type {LocationInterface} from '../../types/locationType';
import {normalizeWord} from '../../utils/normalizeWord';

const Menu = ({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'Description'>): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState('');
  const [filters, setFilter] = useState<Record<string, boolean>>({});

  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery(
    ['list-locations-favorites', filters],
    async () => {
      const response = await locationApi.list(filters, true);
      return response;
    },
  );

  const locations = data as LocationInterface[];

  const tagsFilters = [
    {name: 'Religioso', icon: 'book'},
    {name: 'Cultural', icon: 'film'},
    {name: 'Natureza', icon: 'cloud'},
    {name: 'Histórico', icon: 'pen-tool'},
    {name: 'Restaurante', icon: 'coffee'},
    {name: 'Hotel', icon: 'briefcase'},
  ];

  const renderLocation = ({item}: ListRenderItemInfo<LocationInterface>) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Description', {
            locationId: item.id,
          })
        }>
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
      </Pressable>
    );
  };

  return (
    <Box flex={1} flexDirection={'column'} backgroundColor={'#f6f6f6'}>
      {isLoading ? (
        <Loading count={7} />
      ) : (
        <HStack
          flexDirection={'column'}
          w="100%"
          justifyContent={'center'}
          safeArea>
          <Heading padding={6} color="#2C69E0" textAlign={'center'}>
            Favoritos
          </Heading>

          <Box padding={5}>
            <Input
              value={value}
              w="100%"
              onChangeText={text => {
                setValue(text);
              }}
              color={'#6D6D6D'}
              focusOutlineColor={'#2C69E0'}
              backgroundColor={'#f6f6f6'}
              variant="outline"
              paddingX={5}
              rightElement={
                <IconButton
                  onPress={() => setShowModal(true)}
                  _icon={{
                    name: 'filter',
                    as: FeatherIcon,
                    size: 5,
                    color: '#6D6D6D',
                  }}
                  variant={'ghost'}
                />
              }
            />
          </Box>
        </HStack>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400" maxH="352">
          <Modal.CloseButton />
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            {/* FlatList break virtual list,i need read more about it */}
            {tagsFilters.map((tag, index) => {
              return (
                <TagFilter
                  onToggle={() => {
                    setFilter({...filters, [tag.name]: !filters[tag.name]});

                    queryClient.invalidateQueries('list-locations-favorites');

                    return filters[tag.name];
                  }}
                  name={tag.name}
                  icon={tag.icon}
                  key={index}
                  isChecked={filters[tag.name]}
                />
              );
            })}
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Box
        flex={1}
        paddingX={5}
        flexDirection={'column'}
        justifyContent={'center'}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={locations?.filter(({name}) =>
            normalizeWord(name).includes(normalizeWord(value)),
          )}
          renderItem={renderLocation}
        />
      </Box>
      )
    </Box>
  );
};

export default Menu;

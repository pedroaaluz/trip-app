import React from 'react';
import {Box, Icon, Text, Switch} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

interface TagFilterProps {
  name: string;
  icon: string;
}

const TagFilter = ({name, icon}: TagFilterProps): JSX.Element => {
  return (
    <Box
      marginX={2}
      marginBottom={5}
      justifyContent={'space-around'}
      minWidth={40}
      flexDirection={'row'}
      flex={1}>
      <Box flex={1} flexDirection={'row'} alignItems={'center'}>
        <Icon as={Feather} size={5} name={icon} color={'#b8b0b0'} />
        <Text marginLeft={3} fontSize="lg">
          {name}
        </Text>
      </Box>
      <Switch size="md" />
    </Box>
  );
};

export default TagFilter;

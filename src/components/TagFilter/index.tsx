import React /* , {useState} */ from 'react';
import {Box, Icon, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const TagFilter = ({name, icon}): JSX.Element => {
  return (
    <Box
      alignItems={'center'}
      flexDirection={'column'}
      padding={6}
      borderColor={'#b8b0b0'}
      borderWidth={1}
      marginX={2}
      minWidth={40}
      borderRadius={20}
      flex={1}>
      <Icon as={Feather} size={8} name={icon} color={'#b8b0b0'} />
      <Text fontSize="lg" marginTop={2}>
        {name}
      </Text>
    </Box>
  );
};

export default TagFilter;

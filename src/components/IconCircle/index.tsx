import React from 'react';
import {Box, Icon, Text} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface IconCircleProps {
  header: string;
  text: string;
  icon: string;
}

const IconCircle = ({header, icon, text}: IconCircleProps): JSX.Element => {
  return (
    <Box flexDirection={'row'} alignItems={'center'}>
      <Box
        borderColor={'#2C69E0'}
        borderWidth={1}
        borderRadius={22}
        padding={2}>
        <Icon as={FeatherIcon} name={icon} size={5} color={'#2C69E0'} />
      </Box>
      <Box flexDirection={'column'} marginLeft={2}>
        <Text>{header}</Text>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};

export default IconCircle;

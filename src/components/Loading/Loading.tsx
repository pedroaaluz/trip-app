import React /* , {useState} */ from 'react';
import {Center, VStack, Skeleton} from 'native-base';

const Loading = ({count = 5}: {count?: number}): JSX.Element => {
  const skeleton = Array.from({length: count}, (_, index) => (
    <VStack
      marginBottom={10}
      key={index}
      w="90%"
      maxW="400"
      borderWidth="1"
      space={8}
      overflow="hidden"
      rounded="md"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton h="40" />
      <Skeleton.Text px="4" />
      <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
    </VStack>
  ));
  return <Center w="100%"> {skeleton} </Center>;
};

export default Loading;

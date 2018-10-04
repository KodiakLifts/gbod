import React from 'react';
import { View } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';

const Logs = (props) => {
  return (
    <SubScreenTemplate
      headerContent={
        <View />
      }
      scrollContent={<View />}
    />
  );
};

export default Logs;
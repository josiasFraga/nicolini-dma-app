import 'react-native-gesture-handler';
import Routes from '@constants/routes';
import { StatusBar, Alert } from 'react-native';
import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import AlertHelper from '@components/Alert/AlertHelper';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

  return (
    <SafeAreaProvider>

      <Provider store={store}>
        <Routes />
      </Provider>

      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row',
        }}
        ref={ref => AlertHelper.setDropDown(ref)}
        onClose={() => AlertHelper.invokeOnClose()}
        //StatusBar={{translucent: true}}
        translucent={true}
        inactiveStatusBarBackgroundColor={'transparent'}
        //inactiveStatusBarStyle={'dark-content'}
      />
    </SafeAreaProvider>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
});

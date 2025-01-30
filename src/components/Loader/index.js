import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimatedLoader extends React.PureComponent {
  static defaultProps = {
    visible: false,
    color: '#FF6600', // Cor padrão do indicador
    size: 'large', // Tamanho padrão do indicador
  };

  static propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    bg: PropTypes.string,
  };

  render() {
    const {visible, color, size, bg} = this.props;

    // Define a visibilidade do loader
    if (!visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
});

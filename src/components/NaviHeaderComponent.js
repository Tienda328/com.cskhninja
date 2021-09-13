import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from './FocusAwareStatusBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.logo,
    width: '100%',
  },
  back_wrapper: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    width: 45,
    height: 40,
  },
  arrow_back: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    bottom: 12,
    marginLeft: 45,
    marginRight: 45,
    flex: 1,
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
    color: colors.white,
  },
});

const NaviHeaderComponent: () => React$Node = (props) => {
  const navigation = useNavigation();

  const onBackPress = async () => {
    if (props.onBackPress !== undefined) {
      const back = await props.onBackPress();
      if (back === false) {
        return;
      }
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.colourStatus}
      />
      {navigation.canGoBack() ? (
        <TouchableOpacity onPress={onBackPress} style={styles.back_wrapper}>
          <View style={styles.arrow_back}>
            {/* <BackArrow fill={colors.black} /> */}
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
    </View>
  );
};

NaviHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func,
};

NaviHeaderComponent.defaultProps = {
  title: '',
};

export default NaviHeaderComponent;

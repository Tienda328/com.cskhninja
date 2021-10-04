import React from 'react';
import {TouchableOpacity, Animated} from 'react-native';
// 6 is a quantity of tabs

const TabView = ({
  style,
  stylesSub,
  tab,
  page,
  isTabActive,
  onPressHandler,
  onTabLayout,
}) => {
  const {tabName, totalItem} = tab;
  const styleTab = [
    {
      marginHorizontal: 0,
      paddingVertical: 5,
    },
    style,
  ];
  const containerStyle = {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: stylesSub.backgroundColor,
    opacity: stylesSub.opacity,
    transform: [{scale: stylesSub.opacity}],
  };
  const textStyle = {
    color: stylesSub.textColor,
    fontSize: stylesSub.fontSize,
    fontWeight: '600',
  };
  let namePage = tabName + (totalItem ? ' (' + totalItem + ')' : '');
  return (
    <TouchableOpacity
      style={styleTab}
      onPress={onPressHandler}
      onLayout={onTabLayout}
      key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{namePage}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabView;

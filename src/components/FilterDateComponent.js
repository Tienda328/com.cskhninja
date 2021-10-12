import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import common from '../utils/common';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const FilterDateComponent = ({
  date,
  isFromDate,
  title,
  toDate,
  fromDate,
  setDate,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (theDate) => {
    hideDatePicker();
    setDate(theDate);
  };
  return (
    <View style={styles.viewInputPicker}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.containerDate}
          onPress={() => {
            setDatePickerVisibility(true);
          }}>
          <Ionicons name={'calendar-outline'} size={23} style={{ color: 'gray', marginHorizontal: 20, }} />
          <Text style={date ? styles.txtDate : styles.txtDate1}>
            {date ?
              // ? Platform.OS === 'ios'
              //   ? common.formatDateLocale(date)
              //   : common.formatDate(date)
              common.formatDate(date)
              : `${title}`}
          </Text>
        </TouchableOpacity>
      </View>
      {date ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDate(null);
          }}>
          <Text style={styles.txtDelete}>Xoá</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDatePickerVisibility(true);
          }}>
          <MaterialCommunityIcons name={'calendar-outline'} size={23} style={{ color: '#0000FF', marginRight: 20, }} />
        </TouchableOpacity>
      )}
      <DateTimePickerModal
        date={date ?? new Date()}
        locale="vi"
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={isFromDate ? toDate : null}
        minimumDate={!isFromDate ? fromDate : null}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        customHeaderIOS={isFromDate ? HeaderFromDateIOS : HeaderToDateIOS}
        confirmTextIOS="Chọn"
        cancelTextIOS="Huỷ"
      />
    </View>
  );
};

const HeaderFromDateIOS = () => {
  return (
    <View>
      <Text style={styles.headerIOS}>Từ ngày</Text>
    </View>
  );
};
const HeaderToDateIOS = () => {
  return (
    <View>
      <Text style={styles.headerIOS}>Đến ngày</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewInputPicker: {
    flexDirection: 'row',
    paddingBottom: 14,
    backgroundColor: '#fff',
    marginBottom: 5,
    alignItems: 'center',
  },
  containerDate: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtDelete: {
    marginRight: 20,
    paddingVertical: 8
  },
  headerIOS: {
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: { flex: 1 },
  txtTitle: {
    color: 'rgba(13, 12, 12, 0.5)',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  txtDate: {
    color: '#05375a',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    flex: 1, paddingVertical: 8,
  },
  txtDate1: {
    color: 'rgba(47, 47, 47, 0.5)',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    flex: 1, paddingVertical: 8,
  },
});

export default FilterDateComponent;

import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateIcon from '../resource/image/date.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import common from '../utils/common';
import colors from '../constants/colors';

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
          onPress={() => {
            setDatePickerVisibility(true);
          }}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={date ? styles.txtDate : styles.txtDate1}>
            {date
              ? Platform.OS === 'ios'
                ? common.formatDateLocale(date)
                : common.formatDate(date)
              : 'Chọn ngày'}
          </Text>
        </TouchableOpacity>
      </View>
      {date ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDate(null);
          }}>
          <Text>Xoá</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDatePickerVisibility(true);
          }}>
          <DateIcon />
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
    elevation: 3,
    shadowColor: colors.black,
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    flexDirection: 'row',
    marginTop: 10,
    marginVertical: 10,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  headerIOS: {
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {flex: 1},
  txtTitle: {
    color: 'rgba(13, 12, 12, 0.5)',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  txtDate: {color: '#05375a'},
  txtDate1: {color: 'rgba(47, 47, 47, 0.5)'},
});

export default FilterDateComponent;

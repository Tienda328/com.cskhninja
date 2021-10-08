import { StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('screen').height;
export default StyleSheet.create({
  txtTitle: {
    width: 160,
    fontSize: 13,
    fontWeight: '400'
  },
  containerName: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtStt: {
    marginLeft: 10,
    width: 40,
    textAlign: 'center'
  },
  containerItem: {
    height: 30,
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    marginHorizontal: 10,

  },
  containerAll: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
    height:90,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  containerLeft: {
    // alignItems:'center',
    flexDirection: 'row'
  },
  txtLeft: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    paddingVertical: 5,
    width: 120
  },
  txtLeftEmail: {
    fontSize: 12,
    color: '#2E2E2E',
    marginLeft: 5,
    paddingVertical: 5,
    width: 150
  },
  txtRight: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 20,
    paddingVertical: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  containerText: {
    flex:1,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between'
  }
});

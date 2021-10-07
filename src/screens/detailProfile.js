import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import ItemDetailIcon from '../components/itemDetailIcon';
import ItemComponentTitle from '../components/itemComponentTitle';

class DetailProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surName: '',
            email: '',
            phoneNumber: '',
        };
    }

    async componentDidMount() {
        const user_name = await getLocale(LOCALE_KEY.user_name);
        const email = await getLocale(LOCALE_KEY.email);
        const phone_number = await getLocale(LOCALE_KEY.phone_number);
        this.setState({
            email: email,
            surName: user_name,
            phoneNumber: phone_number
        })
    }

    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { surName, email, phoneNumber, } = this.state
        return (
            <View style={styles.containerALL}>
                <NaviHerderFull title={'THÔNG TIN CÁ NHÂN'} buttonLeft={true} onPressBack={this.goBack} />

                <View style={styles.container}>
                    <ItemComponentTitle
                        nameTitle={'Thông tin cá nhân'}
                        drawIconLeft={
                            <View>
                                <ItemDetailIcon txtValue={surName}
                                    nameIcon={'rename-box'}
                                    styleColour={styles.txtColour} />
                                <ItemDetailIcon txtValue={email}
                                    nameIcon={'email'}
                                    styleColour={styles.txtColour} />
                                <ItemDetailIcon txtValue={phoneNumber}
                                    nameIcon={'cellphone'}
                                    containerText={{ borderBottomColor: '#fff' }}
                                    styleColour={styles.txtColour} />
                            </View>
                        } />

                </View>

            </View>
        );
    }

}


export default DetailProfile;
const styles = StyleSheet.create({
    containerALL: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    container: {
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
    },
    txtColour: {
        fontSize: 18,
    },
})
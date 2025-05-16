import { StyleSheet, View } from "react-native";
import Menu from '../skcamcomown/mqwmsowqidx';

const ScreenWrapper = ({ child, main }) => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {child}
            </View>
            {
                main && (
                    <View style={styles.menu}>
                        <Menu />
                    </View>
                )
            }
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#d3e7ff',
        alignItems: 'center'
    },

    menu: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
    
})

export default ScreenWrapper;
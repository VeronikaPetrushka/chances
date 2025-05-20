import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import useNavigationHandler from '../DecisionConstantsPath/useNavigationHandler';
import Icon from './wefdwefmoe';

const ppalkfme = [
  { saxopskx: 'QuestionsScreen', pasdopsalx: 'Questions', sscdxjnscn: require('../alkmmdwmwem/odkcfdekmvpoe/menu/questions.png') },
  { saxopskx: 'CompareScreen', pasdopsalx: 'Compare', sscdxjnscn: require('../alkmmdwmwem/odkcfdekmvpoe/menu/compare.png') },
  { saxopskx: 'ProsConsScreen', pasdopsalx: 'Pros/Cons', sscdxjnscn: require('../alkmmdwmwem/odkcfdekmvpoe/menu/pros-cons.png') },
  { saxopskx: 'DecisionQuizScreen', pasdopsalx: 'Quiz', sscdxjnscn: require('../alkmmdwmwem/odkcfdekmvpoe/menu/quiz.png') },
];

const Nav = () => {
  const { currentRoute, handleNavigation } = useNavigationHandler();

  return (
    <View style={styles.container}>
      {ppalkfme.map((itm, idx) => {
        const isActive = currentRoute === itm.saxopskx;
        return (
          <TouchableOpacity
            key={idx}
            style={[styles.btn, isActive && {backgroundColor: '#fdb938'}]}
            onPress={() => handleNavigation(itm.saxopskx)}
          >
            <Icon image={itm.sscdxjnscn} active={isActive} width={28} height={28} />
            <Text style={[styles.btnText, isActive && {color: '#393e42'}]}>{itm.pasdopsalx}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#393e42',
        padding: 12,
        paddingBottom: 20
    },
    
    btn: {
        width: 73,
        height: 68,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 24
    },

    btnText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
        marginTop: 8
    }

});

export default Nav;

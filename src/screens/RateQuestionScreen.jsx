import ScreenWrapper from "../components/ScreenWrapper";
import RateQuestion from "../components/RateQuestion";

const RateQuestionScreen = ({ route }) => {
    const { item, option } = route.params;
    return (
        <ScreenWrapper child={<RateQuestion item={item} option={option} />} />
    )
};

export default RateQuestionScreen;
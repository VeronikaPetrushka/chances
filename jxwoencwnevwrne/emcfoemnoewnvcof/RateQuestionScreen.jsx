import ScreenWrapper from "../DecisionConstantsPath/wemfcmefck";
import RateQuestion from "../skcamcomown/dwe,we,c";

const RateQuestionScreen = ({ route }) => {
    const { item, option } = route.params;
    return (
        <ScreenWrapper child={<RateQuestion item={item} option={option} />} />
    )
};

export default RateQuestionScreen;
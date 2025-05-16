import ScreenWrapper from "../DecisionConstantsPath/wemfcmefck";
import RateOption from "../skcamcomown/ewwpicfmiemcm";

const RateOptionScreen = ({ route }) => {
    const { item, option } = route.params;
    return (
        <ScreenWrapper child={<RateOption item={item} option={option} />} />
    )
};

export default RateOptionScreen;
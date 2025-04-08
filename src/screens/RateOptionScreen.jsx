import ScreenWrapper from "../components/ScreenWrapper";
import RateOption from "../components/RateOption";

const RateOptionScreen = ({ route }) => {
    const { item, option } = route.params;
    return (
        <ScreenWrapper child={<RateOption item={item} option={option} />} />
    )
};

export default RateOptionScreen;
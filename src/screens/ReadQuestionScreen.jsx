import ScreenWrapper from "../components/ScreenWrapper";
import ReadQuestion from "../components/ReadQuestion";

const ReadQuestionScreen = ({ route }) => {
    const { item } = route.params;
    return (
        <ScreenWrapper child={<ReadQuestion item={item} />} />
    )
};

export default ReadQuestionScreen;
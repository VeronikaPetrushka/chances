import ScreenWrapper from "../DecisionConstantsPath/wemfcmefck";
import ReadQuestion from "../skcamcomown/ermfrekmflmf";

const ReadQuestionScreen = ({ route }) => {
    const { item } = route.params;
    return (
        <ScreenWrapper child={<ReadQuestion item={item} />} />
    )
};

export default ReadQuestionScreen;
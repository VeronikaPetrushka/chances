import ScreenWrapper from "../DecisionConstantsPath/wemfcmefck";
import AddQuestion from "../skcamcomown/cmweidpwedopwek";

const AddQuestionScreen = ({ route }) => {
    const { item } = route.params || {};
    return (
        <ScreenWrapper child={<AddQuestion item={item} />} />
    )
};

export default AddQuestionScreen;
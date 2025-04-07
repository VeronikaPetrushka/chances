import ScreenWrapper from "../components/ScreenWrapper";
import AddQuestion from "../components/AddQuestion";

const AddQuestionScreen = ({ route }) => {
    const { item } = route.params || {};
    return (
        <ScreenWrapper child={<AddQuestion item={item} />} />
    )
};

export default AddQuestionScreen;
import ScreenWrapper from "../components/ScreenWrapper";
import Questions from "../components/Questions";

const QuestionsScreen = () => {
    return (
        <ScreenWrapper child={<Questions />} main />
    )
};

export default QuestionsScreen;
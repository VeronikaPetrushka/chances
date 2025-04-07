import ScreenWrapper from "../components/ScreenWrapper";
import FavoriteQuestions from "../components/FavoriteQuestions";

const FavoriteQuestionsScreen = () => {
    return (
        <ScreenWrapper child={<FavoriteQuestions />} />
    )
};

export default FavoriteQuestionsScreen;
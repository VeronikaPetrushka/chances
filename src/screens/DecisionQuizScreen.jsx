import ScreenWrapper from "../components/ScreenWrapper";
import DecisionQuiz from "../components/DecisionQuiz";

const DecisionQuizScreen = () => {
    return (
        <ScreenWrapper child={<DecisionQuiz />} main />
    )
};

export default DecisionQuizScreen;
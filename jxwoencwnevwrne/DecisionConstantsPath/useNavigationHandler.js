import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const useNavigationHandler = () => {
    const navigation = useNavigation();
    const [currentRoute, setCurrentRoute] = useState('QuestionsScreen');

    const handleNavigation = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    useEffect(() => {
        const updateRoute = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const activeRoute = state.routes[state.index];
                if (activeRoute?.name) {
                    setCurrentRoute(activeRoute.name);
                }
            }
        };

        updateRoute();

        const unsubscribe = navigation.addListener('state', updateRoute);

        return unsubscribe;
    }, [navigation]);

    return { currentRoute, handleNavigation };
};

export default useNavigationHandler;
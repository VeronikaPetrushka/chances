import React from 'react';
import { Image } from 'react-native';

const Icon = ({ image, width, height, active }) => {
    return (
        <Image 
            source={image}
            style={[{
                width: width, 
                height: height, 
                resizeMode: 'contain'
            },
            active && {tintColor: '#393e42'}]}
        />
    );
};

export default Icon;
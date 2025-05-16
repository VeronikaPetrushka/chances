import React from 'react';
import { Image } from 'react-native';

const Icon = ({ image, width, height, active }) => {
    return (
        <Image 
            source={image}
            style={{
                width: width, 
                height: height, 
                resizeMode: 'contain',
                tintColor: active ? '#393e42' : '#ffffff'
            }}
        />
    );
};

export default Icon;
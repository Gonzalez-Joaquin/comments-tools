import React from 'react';

import './typography.css'

interface TextProps {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',

    style_type: 'text-title' | 'text-subtitle' | 'text-p' | 'text-button',

    styles_color?: 'text-primario' | 'text-secundario' | 'text-color-details' | 'text-color-error' | 'text-color-great' | 'text-blanco',

    style_transform?: 'text-uppercase' | 'text-capitalize',

    size?: 'text-extra-small' | 'text-small' | 'text-pre-medium' | 'text-medium' | 'text-large' | 'text-auto',

    content: string,
}

export const Text = (props: TextProps) => {
    const classNames = ` ${props.style_type || ''} ${props.style_transform || ''} ${props.styles_color || 'text-primario'} ${props.size || ''}`;

    return React.createElement(props.type, { className: classNames }, props.content);
}

export default Text
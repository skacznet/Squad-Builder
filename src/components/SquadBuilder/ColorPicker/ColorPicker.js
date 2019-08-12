import React from 'react';
import classes from './ColorPicker.css';

import { InputLabel } from '@material-ui/core';

const ColorPicker = props => {

    const colors = [
        '#ffffff',
        '#666666',
        '#000000',
        '#d50000',
        '#aa00ff',
        '#2962ff',
        '#00b8d4',
        '#00c853',
        '#ffd600',
        '#ff6d00' 
    ];

    let colorClass = '';

    // Map colors array to div elements and set the active color class.
    const colorItems = colors.map((color) => {
        if(color === props.activeColor) {
            colorClass = classes.activeColor;
        } else {
            colorClass = '';
        }
        return (
            <div key={color} className={[colorClass, classes.ColorItem].join(' ')} style={{backgroundColor: color}} data-color={color} onClick={props.onColorChange}></div>
        )
    });

    return (
        <div>
            <InputLabel className={classes.ColorPickerLabel} shrink={true}>{props.pickerLabel}</InputLabel>
            <div className={classes.ColorsWrapper}>
                {colorItems}
            </div>
        </div>
    );
}

export default ColorPicker;
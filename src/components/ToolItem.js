import React from 'react';
import {errorColor, primary3, primary45} from '../colors';
import useHover from '../hooks/useHover';
import useDimensions from 'react-use-dimensions';

export function ToolItem({
  iconComponent,
  onClick,
  size,
  changeColor,
  tooltip,
  title,
  defaultColor,
  id,
  className,
}) {
  const [hoverRef, isHovered] = useHover();
  const [fullDimensionsRef, fullDimensions] = useDimensions();

  const [tooltipRef, tooltipDimensions] = useDimensions();
  const IconComponent = iconComponent;
  const tooltipWidth = tooltipDimensions.width ? tooltipDimensions.width : 0;

  if (!defaultColor) {
    defaultColor = primary3;
  }

  if (!changeColor) {
    changeColor = errorColor;
  }

  const styles = {
    container: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: 4,
      fontSize: 14,
    },
    popover: {
      position: 'fixed',
      top: fullDimensions.y - 32,
      left: fullDimensions.x - (tooltipWidth / 2 - 8),
      backgroundColor: primary3,
      color: '#FFF',
      padding: '4px 6px',
      borderRadius: 2,
      fontSize: 14,
      fontWeight: 400,
      zIndex: 1000,
      pointerEvents: 'none',
    },
    title: {
      color: isHovered ? changeColor : defaultColor,
      marginLeft: 4,
      textDecoration: isHovered ? 'underline' : 'none',
      fontSize: 13,
      lineHeight: '13px',
    },
  };

  return (
    <div
      id={id}
      className={className}
      style={styles.container}
      ref={hoverRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}>
      <div ref={fullDimensionsRef} />
      {iconComponent ? (
        <IconComponent
          color={isHovered ? changeColor : defaultColor}
          size={size ? size : 16}
          style={styles.icon}
        />
      ) : null}
      {title ? <span style={styles.title}>{title}</span> : null}
      {isHovered && tooltip ? (
        <div style={styles.popover} ref={tooltipRef}>
          {tooltip}
        </div>
      ) : null}
    </div>
  );
}

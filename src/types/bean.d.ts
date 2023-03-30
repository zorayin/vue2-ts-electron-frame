/* eslint-disable no-unused-vars */
declare namespace ApiBean {}

declare namespace StyleApiBean {
  interface StyleBean {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    margin?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
    marginTop?: string;
    padding?: string;
    position?: string;
    opacity?: string | number;
    zIndex?: number;
    cursor?: string;
    overflow?: string;
    filter?: string;
    textAlign?: string;
    textSize?: string;
    lineHeight?: string;

    fontSize?: string;
    fontFamily?: string;
    fontStyle?: string;
    textDecoration?: string;
    textShadow?: string;
    fontWeight?: string;

    color?: string;
    background?: string;
    backgroundImage?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    backgroundColor?: string;

    display?: string;
    justifyContent?: string;
    alignItems?: string;
    flex?: string;
    flexDirection?: string;

    boxSizing?: string;
    objectFit?: string;
    transition?: string;
    transform?: string;
    transformOrigin?: string;
    msTransform?: string;
    webkitTransform?: string;

    border?: string;
    borderColor?: string;
    borderRadius?: string;
    borderTop?: string;
    borderRight?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRadiusTop?: string;
    borderRadiusRight?: string;
    borderRadiusBottom?: string;
    borderRadiusLeft?: string;
    borderImageSource?: string;
    borderImageSlice?: string;
    borderWidth?: string;
    borderRightWidth?: string;
    borderBottomWidth?: string;

    boxShadow?: string;

    paddingRight?: string;

    flexBasis?: string;
    resize?: string;

    letterSpacing?: string;
    textLine?: string;
    lineHeight?: string;

    gridGap?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridRowGap?: string;
    gridColumnGap?: string;
  }
}

declare namespace GlobalBean {
  interface ResParams<T> {
    message: string | null;
    result: T;
    type: string;
  }
}

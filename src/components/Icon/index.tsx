import "./index.less";

import IconProps, {ItfType} from "./propsType";

import classNames from "classnames";
import * as React from "react";

export default class Icon extends React.Component<IconProps, any> {
  static defaultProps = {
    // activeStyle: {},
    className: "",
    color: "",
    disabled: false,
    // loading: false,
    name: "",
    onClick: () => {},
    prefixCls: "yh-icon",
    size: "default",
    style: {},
    // textStyle: {},
    type: "default",
  };
  constructor(props: IconProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const iconMap = [
      "global-close",
      "select-fill",
      "select-line",
      "select-normal",
      "delete",
      "loaction",
      "location-small",
      "minus",
      "minus-circle",
      "minus-outline",
      "plus-circle",
      "plus-outline",
      "plus",
      "money",
      "pay",
      "phone",
      "telephone",
      "plus",
      "search",
      "scan-code",
      "shopping-cart",
    ];
    const {
      children, prefixCls, name, color, style, className, type, size, disabled, onClick, ...restProps
    } = this.props;
    if (iconMap.indexOf(name) === -1) {
      // return Console.warn(the name is not supported);
    }
    const sizeMap: ItfType = {
      lg: 20,
      md: 18,
      sm: 16,
      xs: 14,
      xxs: 12,
    };
    let fontSize = typeof size === "string" ? sizeMap[size] : size;
    fontSize = fontSize || 16;
    const wrapCls = {
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${name}`]: true,
      [className]: className,
    };
    const sty = {
      color,
      fontSize: fontSize + "px",
      ...style,
    };
    return (
      <i
        role="icon"
        className={classNames(wrapCls)}
        style={sty}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...restProps}
      />
  );
  }

}
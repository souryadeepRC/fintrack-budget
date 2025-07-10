import "./Button.scss";
type ButtonVariant = "outlined" | "contained" | "text";
type ButtonMode = "info" | "warning" | "error";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonVariant;
  mode?: ButtonMode;
}
const getClasses = (
  className: string,
  variant: ButtonVariant,
  mode: ButtonMode | undefined,
  disabled: boolean | undefined
) => {
  let classList = ["btn", variant];
  if (className) {
    classList.push(className);
  }
  if (mode) {
    classList.push(mode);
  }
  if (disabled) {
    classList.push("disabled");
  }
  return classList.join(" ");
};
const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = "contained",
    mode,
    startIcon,
    children,
    endIcon,
    className = "",
    ...rest
  } = props;
  const classes = getClasses(className, variant, mode, rest.disabled);
  return (
    <button className={classes} {...rest}>
      {startIcon && <>{startIcon}</>}
      {children}
      {endIcon && <>{endIcon}</>}
    </button>
  );
};

export default Button;

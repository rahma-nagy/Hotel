import Styles from "./CustomButton.module.scss";
import Button from "@mui/material/Button";
import { Props } from './../../../interface/UIInterface';


const CustomButton : React.FC<Props> = ({ 
  className,
   type, 
     sx,
      children,
      ...buttonProps
     }) => {
  return (
    <Button
      className={`${Styles.loginBtn} ${className || ""}`}
      type={type}
      sx={sx}
      {...buttonProps}
    >
       {children}
    </Button>
  );
};


export default CustomButton;

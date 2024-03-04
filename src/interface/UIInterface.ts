import  { ButtonProps } from "@mui/material/Button";

export interface Props extends ButtonProps {
  className?: string;
  sx?: object;
}

// export interface CustomButtonProps {
//   className?: string;
//   type?: string;
//   fullWidth?: boolean;
//   variant?: string;
//   sx?: object;
//   children: React.ReactNode;
// }
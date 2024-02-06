import { FC } from 'react';
import Alert from '@mui/material/Alert';

type Severity = 'error' | 'success' | 'info' | 'warning'

type Props = {
  severity: Severity,
  text: string,
  mt: string
}

export const CustomAlert: FC<Props> = ({ severity, text, mt }) => {
  return <Alert style={{ marginTop: mt }} severity={severity}>{text}</Alert>;
};
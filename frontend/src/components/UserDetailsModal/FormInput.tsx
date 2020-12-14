import React from 'react';
import { type } from 'os';
import styles from './FormInput.module.scss';

type FormInputProps = {
  formik: any;
  label: string;
  inputName: string;
};

const FormInput: React.FC<FormInputProps> = ({ formik, label, inputName }) => {
  console.log('stop collapsing me!');
  return (
    <div className={styles.formGroup}>
      <label htmlFor={inputName}>{label}</label>
      <input type="text" id={inputName} name={inputName} />
    </div>
  );
};

export default FormInput;

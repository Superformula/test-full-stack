import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Map from './Map';
import styles from './UserDetailsModalContent.module.scss';
import FormInput from './FormInput';

// TODO: Assess if the modal is for creating or updating based on the data passed in to it
const UserDetailsModalContent: React.FC = () => {
  console.log('dont collapse me');

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('The name is a required field'),
      address: Yup.string().required('The address is a required field'),
      description: Yup.string().required('The description is a required filed'),
    }),
    onSubmit: (values) => {
      console.log('Values here', values);
    },
  });

  // const onSubmit = useCallback();

  return (
    <div className={styles.content}>
      <h1>Create User</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formContent}>
          <Map />
          <div className={styles.formRightSide}>
            <FormInput formik={formik} inputName="name" label="Name" />
            <FormInput formik={formik} inputName="name" label="Name" />
            <FormInput formik={formik} inputName="name" label="Name" />
            <FormInput formik={formik} inputName="name" label="Name" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsModalContent;

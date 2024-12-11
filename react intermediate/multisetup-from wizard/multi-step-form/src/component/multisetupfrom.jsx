// src/MultiStepForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Step 1: Schema validation using Yup
const step1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

const step2Schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const step3Schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions").required(),
});

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  // Initialize form hook for each step
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema),
  });

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data) => {
    nextStep(data);
  };

  return (
    <div className="multi-step-form">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <label>
              First Name:
              <input type="text" {...register('firstName')} />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </label>
            <br />
            <label>
              Last Name:
              <input type="text" {...register('lastName')} />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </label>
            <br />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <label>
              Email:
              <input type="email" {...register('email')} />
              {errors.email && <p>{errors.email.message}</p>}
            </label>
            <br />
            <label>
              Password:
              <input type="password" {...register('password')} />
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            <br />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <label>
              Country:
              <input type="text" {...register('country')} />
              {errors.country && <p>{errors.country.message}</p>}
            </label>
            <br />
            <label>
              Accept Terms:
              <input type="checkbox" {...register('terms')} />
              {errors.terms && <p>{errors.terms.message}</p>}
            </label>
            <br />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="submit">Next</button>}
          {step === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

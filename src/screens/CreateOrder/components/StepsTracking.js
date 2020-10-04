import React from 'react';
import {Steps} from 'antd';

const {Step} = Steps;

const StepTracking = ({currentStep}) => {
  return (
    <Steps size="small" current={currentStep}>
      <Step title="Uploading"/>
      <Step title="Instructions"/>
      <Step title="Submitting"/>
    </Steps>
  )
}

export default StepTracking;

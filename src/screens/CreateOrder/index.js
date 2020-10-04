import React, {useState} from "react";
import {Row, Col, Card, Button, Space} from "antd";
import Uploading from "./components/Uploading";
import StepTracking from "./components/StepsTracking";
import Instructions from "./components/Instructions";
import './styles.less';
import Submitting from "./components/Submitting";

const CreateOrder = () => {
  const [step, setStep] = useState(0);
  const [instructions, setInstructions] = useState([
    {
      name: 'hello.png',
      size: 10244440594,
      basicPrice: 10,
      advancePrice: 10,
    },
    {
      name: 'hello.png',
      size: 10244440594,
      basicPrice: 10,
      advancePrice: 10,
    }
  ]);

  const onAddFiles = (event) => {
    const {files: fileSelect} = event.target;
    const newInstructions = Array.from(fileSelect).map(file => {
      return {
        name: file.name,
        size: file.size,
        basicPrice: 10,
        advancePrice: 10,
      }
    })
    setInstructions([
      ...instructions,
      ...newInstructions]);
  }
  const onDeleteFile = (index) => {
    let tmpInstructions = [...instructions];
    tmpInstructions.splice(index, 1);
    setInstructions(tmpInstructions);
  }

  const onItemInstructionChange = (index, key, value) => {
    const tmpInstructions = [...instructions];
    tmpInstructions[index][key] = value;
    setInstructions(tmpInstructions);
  }

  const onChangeRushService = (val) => {
    console.log(val);
  }

  const onSubmit = () => {
    console.log('Submit');
  }

  const _renderStep = () => {
    switch (step) {
      case 0: {
        return <Uploading
          files={instructions}
          onAddFiles={onAddFiles}
          onDeleteFile={onDeleteFile}
        />
      }
      case 1: {
        return <Instructions
          data={instructions}
          onAddFiles={onAddFiles}
          onItemChange={onItemInstructionChange}
        />
      }
      default: {
        return <Submitting
          instructions={instructions}
          rushService={0}
          onChangeRushService={onChangeRushService}
        />
      }
    }
  }

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <StepTracking
            currentStep={step}
          />
        </Col>
        <Col span="24">
          <Card>
            {_renderStep()}
          </Card>
        </Col>
        <Col>
          <Space>
            {step > 0 ? (
              <Button
                onClick={() => setStep(step - 1)}
              >Back</Button>
            ) : null}
            {step < 2 ? (
              <Button
                type="primary"
                onClick={() => setStep(step + 1)}
              >Continue</Button>
            ) : (
              <Button
                type="primary"
                onClick={onSubmit}
              >Submit</Button>
            )}
          </Space>
        </Col>
      </Row>
    </>
  )
}
export default CreateOrder;

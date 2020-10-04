import React, {useState} from "react";
import {Row, Col, Card, Button, Space} from "antd";
import Uploading from "./components/Uploading";
import StepTracking from "./components/StepsTracking";
import Intructions from "./components/Instructions";
import './styles.less';

const CreateOrder = () => {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([{
    name: 'BNT-12345.png',
    size: 102345
  }]);

  const onAddFiles = (event) => {
    const {files: fileSelect} = event.target;
    setFiles([...files, ...Array.from(fileSelect)]);
  }
  const onDeleteFile = (index) => {
    let tmpFiles = [...files];
    tmpFiles.splice(index, 1);
    setFiles(tmpFiles);
  }

  const _renderStep = () => {
    switch (step) {
      case 0: {
        return <Uploading
          files={files}
          onAddFiles={onAddFiles}
          onDeleteFile={onDeleteFile}
        />
      }
      case 1: {
        return <Intructions/>
      }
      default: {
        return null
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
            <Button
              type="primary"
              onClick={() => setStep(step + 1)}
            >Continue</Button>
          </Space>
        </Col>
      </Row>
    </>
  )
}
export default CreateOrder;

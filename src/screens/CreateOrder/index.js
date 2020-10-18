import React, {useEffect, useState} from "react";
import {Button, Card, Col, notification, Row, Space} from "antd";
import Uploading from "./components/Uploading";
import StepTracking from "./components/StepsTracking";
import Instructions from "./components/Instructions";
import Submitting from "./components/Submitting";
import './styles.less';
import {orderService, templateService} from "../../services";
import {useHistory, useParams} from "react-router-dom";

const CreateOrder = ({location}) => {
  const history = useHistory();
  let {id: orderId} = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [template, setTemplate] = useState({});
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    async function fetchTemplates() {
      const res = await templateService.getAll({
        page: 1,
        size: 10000,
      });
      setTemplates(res.content);
    };

    fetchTemplates();
  }, [])

  useEffect(() => {
    async function fetchOrderById() {
      try {
        const res = await orderService.getById(orderId);
        if (res && res.images) {
          const newInstruction = res.images.map(({
                                                   setting,
                                                   imgId,
                                                   publicUrl,
                                                   name,
                                                   size,
                                                   ...rest
                                                 }) => {
            return {
              ...rest,
              ...setting,
              publicUrl,
              file: {
                name,
                size,
                url: publicUrl,
                uploaded: true,
              }
            }
          });
          console.log(newInstruction);
          setInstructions(newInstruction);
        }
      } catch (error) {
        notification.error({
          message: error
        })
      }
    };

    fetchOrderById();
  }, [])

  const onChangeTemplate = async (tid) => {
    const res = await templateService.getById(tid);
    const tmpInstructions = instructions.map(i => {
      return {
        ...res.setting,
        file: i.file,
      }
    });
    setTemplate(res);
    setInstructions(tmpInstructions);
  }
  const onAddFiles = async (event) => {
    const {files: fileSelect} = event.target;
    const newInstructions = [];
    for (const file of fileSelect) {
      const {blob, base64} = await toBase64(file);
      newInstructions.push({
        file: {
          name: file.name,
          size: file.size,
          blob,
          url: base64,
        },
        basicPrice: 10,
        advancePrice: 10,
        ...template.setting,
      })
    }
    setInstructions([
      ...instructions,
      ...newInstructions
    ]);
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
  const onChangeAdvance = (index, key, value) => {
    const tmpInstructions = [...instructions];
    tmpInstructions[index].codes = tmpInstructions[index].codes || {};
    tmpInstructions[index].codes[key] = value;
    setInstructions(tmpInstructions);
  }
  const onChangeRushService = (val) => {
  }
  const onSubmit = async () => {
    try {
      setIsSaving(true);
      // Create order
      const payloadCreate = {
        orderType: 'REAL_ESTATE',
        orderName: `REAL_ESTATE${(new Date()).getTime()}`
      }
      const {id: orderId} = await orderService.create(payloadCreate);
      // Upload image
      const links = await getLinkUploadFile(orderId);
      await uploadFiles(links);
      // Submit Setting
      const payloadUpdate = getSenderData(links);
      await orderService.update(orderId, {
        images: [...payloadUpdate]
      });
      setIsSaving(false);
      notification.success({
        message: 'Create Order Successfully'
      });
      history.push('/my-order');
    } catch (error) {
      setIsSaving(false);
      notification.error({
        message: error
      })
    }
  }

  const getSenderData = (links) => {
    return links.map(link => {
      let instruction = instructions.find(({file}) => file.name === link.oName);
      if (!instruction) return {
        setting: {...instruction, file: undefined}
      };
      const {imgId, preSignedURL, publicUrl} = link;
      return {
        setting: {
          ...instruction,
          file: undefined,
        },
        imgId,
        preSignedURL,
        publicUrl,
      }
    });
  }

  const getLinkUploadFile = orderId => {
    const payload = {
      fileNames: instructions.map(i => i.file.name),
      orderId,
    }
    return orderService.generateLinkUploadFile(payload);
  }

  const uploadFiles = (links) => {
    const uploadProcess = links
      .map(({preSignedURL, oName}) => {
        const instruction = instructions.find(({file}) => file.name === oName);
        if (!instruction) return null;
        const {file: {blob, url}} = instruction;
        return orderService.uploadFile(preSignedURL, blob, url);
      })
      .filter(promise => promise)
    return Promise.all(uploadProcess);
  }
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({base64: reader.result, blob: file});
    reader.onerror = error => reject(error);
  });

  const _renderStep = () => {
    switch (step) {
      case 0: {
        return <Uploading
          instructions={instructions}
          onAddFiles={onAddFiles}
          onDeleteFile={onDeleteFile}
        />
      }
      case 1: {
        return <Instructions
          data={instructions}
          tid={template ? template.tid : null}
          templates={templates}
          onChangeTemplate={onChangeTemplate}
          onAddFiles={onAddFiles}
          onItemChange={onItemInstructionChange}
          onChangeAdvance={onChangeAdvance}
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
      <h2>Create Order</h2>
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
                loading={isSaving}
              >Submit</Button>
            )}
          </Space>
        </Col>
      </Row>
    </>
  )
}
export default CreateOrder;

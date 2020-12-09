import React, {useEffect, useState} from "react";
import {Button, Card, Col, notification, Row, Space} from "antd";
import Uploading from "./components/Uploading";
import StepTracking from "./components/StepsTracking";
import Instructions from "./components/Instructions";
import Submitting from "./components/Submitting";
import './styles.less';
import {orderService, templateService} from "../../services";
import {useHistory, useParams} from "react-router-dom";
import {settingService} from "../../services/setting.service";
import {calculatorPrice} from "./priceHelper";
import {toBase64} from "../../utils/converts";
import * as CONSTANTS from "../../constants";
import {isStringEqual} from "../../utils/objectUtils";

const CreateOrder = () => {
    const history = useHistory();
    let {id: orderId} = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [step, setStep] = useState(0);
    const [instructions, setInstructions] = useState([]);
    const [template, setTemplate] = useState({});
    const [templates, setTemplates] = useState([]);
    const [advanceSetting, setAdvanceSetting] = useState([]);
    // global price setting
    const [priceSetting, setSettingPrices] = useState([]);
    const [rushServiceFormValue, setRushServiceFormValue] = useState([]);
    const [rushServiceSelected, setRushServiceSelected] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderSetting, setOrderSetting] = useState({});

    useEffect(() => {
        async function fetchTemplates() {
            const res = await templateService.getAll({
                page: 1,
                size: 10000,
            });
            setTemplates(res.content);
        }

        fetchTemplates();
    }, [])

    useEffect(() => {
        async function fetchSettings() {
            const res = await settingService.getAll({
                page: 1,
                size: 10000,
                types: ['BASIC', 'ADVANCE'], // lay ca basic va advance , tuy theo tung loai xu ly anh.
                requestType: ['GENERAL'], // loai xu ly anh dang la GENERAL
            });
            setSettingPrices(res.content.reduce((acc, curr) => (acc[curr.code] = curr.price, acc), {}));
            setAdvanceSetting(getAdvanceSettingFormValue(res));
            setRushServiceFormValue(getRushServicesFormValues(res));
        }

        function getRushServicesFormValues(res) {
            return [{
                value: CONSTANTS.RUSH_SERVICE[0].value,
                text: CONSTANTS.RUSH_SERVICE[0].text,
                price: 0
            },
                ...res.content
                    .filter(el => el.dataType === 'ADVANCE' && el.code.includes('RUSH'))
                    .map(el => {
                        return {
                            value: el.code,
                            text: el.formTitle || el.code,
                            price: el.price
                        }
                    })
            ];
        }

        function getAdvanceSettingFormValue(res) {
            return res.content
                .filter(el => el.dataType === 'ADVANCE')
                .map(el => {
                    return {
                        value: el.code,
                        text: el.formTitle || el.code,
                        price: el.price
                    }
                });
        }

        fetchSettings();
    }, [])

    useEffect(() => {
        if (!orderId) return;

        async function fetchOrderById() {
            try {
                const res = await orderService.getById(orderId);
                if (res) {
                    setOrderSetting(res.orderSetting);
                }
                if (res && res.images) {
                    const newInstruction = res.images
                        .map(({
                                  fileSize,
                                  imgId,
                                  oName,
                                  preSignedURL,
                                  publicUrl,
                                  setting,
                                  ...rest
                              }) => {
                            return {
                                ...rest,
                                ...setting,
                                advancePrice: calculatorPrice(priceSetting, setting.codes),
                                file: {
                                    name: oName,
                                    size: fileSize,
                                    url: publicUrl,
                                    uploaded: true,
                                    imgId,
                                    preSignedURL,
                                    publicUrl,
                                }
                            }
                        });
                    setInstructions(newInstruction);
                }
            } catch (error) {
                notification.error({
                    message: error
                })
            }
        }

        console.count('Callme');
        if (!priceSetting) return;
        fetchOrderById();
    }, [orderId, priceSetting])

    const onChangeTemplate = async (tid) => {
        const res = await templateService.getById(tid);
        const tmpInstructions = instructions.map(i => {
            return {
                ...res.setting,
                file: i.file,
                advancePrice: calculatorPrice(priceSetting, res.setting.codes),
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
                basicPrice: 0,
                advancePrice: 0,
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
        console.log('setting price:', priceSetting)
        console.log('index', tmpInstructions[index].codes);
        tmpInstructions[index].advancePrice = calculatorPrice(priceSetting, tmpInstructions[index].codes);
        console.log('advancePrice', tmpInstructions[index].advancePrice);
        setInstructions(tmpInstructions);

    }

    const getTotalPrice = (instructions) => {
        if (!instructions) {
            return 0;
        }
        let rushPrice = 1;
        if (orderSetting.codes) {
            const setting = orderSetting.codes;
            const rushVal = Object.keys(setting).find(el => (setting[el] + '').indexOf('RUSH'));
            rushServiceFormValue.forEach(function (el, i) {
                if (isStringEqual(el.value, rushVal)) {
                    setRushServiceSelected(i);
                    rushPrice = el.price;
                }
            });
        }
        return rushPrice * instructions.reduce((accumulator, current) => accumulator + (current.basicPrice || 0) + (current.advancePrice || 0), 0);
    }

    const onChangeRushService = (val) => {
        const tmpInstructions = [...instructions];
        console.log('rush changed to:', val);
        setRushServiceSelected(val);
        setTotalPrice(getTotalPrice(tmpInstructions) * (rushServiceFormValue[val].price || 1));
        // const rushVal = {};
        // rushVal[rushServiceFormValue[rushServiceSelected].value] = true;
        // setOrderSetting(prevState => {
        //     prevState.codes = {... prevState.codes, rushVal}
        // })
    }

    const onSubmit = async () => {
        try {
            setIsSaving(true);
            let updateOrderID = orderId;
            if (!orderId) {
                // Create order
                const payloadCreate = {
                    orderType: 'REAL_ESTATE',
                    orderName: `REAL_ESTATE${(new Date()).getTime()}`
                }
                const {id} = await orderService.create(payloadCreate);
                updateOrderID = id;
            }
            // Upload image
            const links = await getLinkUploadFile(updateOrderID);
            links && await uploadFiles(links);
            // Submit Setting
            const payloadUpdate = getSenderData(links);
            // console.log('rushForm', rushServiceFormValue);
            // console.log('rushServiceSelected', rushServiceSelected);
            // console.log('rushDataPut' , rushServiceFormValue[rushServiceSelected].value)

            const rushVal = {};
            rushVal[rushServiceFormValue[rushServiceSelected].value] = true;
            await orderService.update(updateOrderID, {
                orderSetting: {
                    codes: {...rushVal}
                },
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
        return instructions.map(instruction => {
            let link = links && links.find(({oName}) => oName === instruction.file.name);
            const {imgId, preSignedURL, publicUrl} = link ? link : instruction.file;
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
        const fileNames = instructions
            .filter(i => !i.file.uploaded)
            .map(i => i.file.name);
        if (fileNames.length) {
            return orderService.generateLinkUploadFile({
                fileNames,
                orderId,
            });
        }
        return false;
    }

    const uploadFiles = (links) => {
        const uploadProcess = links
            .map(({preSignedURL, oName}) => {
                const instruction = instructions.find(({file}) => file.name === oName && !file.uploaded);
                if (!instruction) return null;
                const {file: {blob, url}} = instruction;
                return orderService.uploadFile(preSignedURL, blob, url);
            })
            .filter(promise => promise);
        return Promise.all(uploadProcess);
    }


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
                    advanceSetting={advanceSetting}
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
                    rushService={rushServiceSelected}
                    rushServiceFormValue={rushServiceFormValue}
                    totalPrice={totalPrice}
                    onChangeRushService={onChangeRushService}
                />
            }
        }
    }

    return (
        <>
            <h2>{orderId ? 'Update Order' : 'Create Order'}</h2>
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
                                onClick={() => {
                                    setStep(step + 1);
                                    setTotalPrice(getTotalPrice(instructions))
                                }}
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

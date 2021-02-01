import { isEmpty } from './objectUtils';

export const getSelectedSettingCodes = (codes) => {
  if (codes) {
    return Object.keys(codes).filter((key) => codes[key]);
  }
  return [];
};

export const getBasePrice = (advanceSetting, settingType) => {
  return (
    advanceSetting.find(
      (el) => el.type === settingType /*&& el.orderType === 'REAL_ESTATE'*/
    )?.price || 0
  );
};

export const getAdvanceSettingFormValue = (res) => {
  if (isEmpty(res)) {
    return [];
  }
  return res.content
    .filter((el) => ADVANCE_SETTINGS.includes(el.settingType))
    .map((el) => {
      return {
        value: el.code,
        text: el.formTitle || el.code,
        price: el.price,
        type: el.settingType,
        orderType: el.requestType,
      };
    });
};

export const ADVANCE_SETTINGS = [
  'ADVANCE',
  'ADDON',
  'RETOUCHING',
  'BASE_PRICE',
];

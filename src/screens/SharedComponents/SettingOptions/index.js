import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Badge, Button, Col, Divider, Checkbox } from 'antd';
import { paymentService } from '../../../services';

const SettingOptions = ({
  advanceSetting,
  settingType,
  codes,
  settingIds,
  onChangeAdvance,
}) => {
  let text = '';
  switch (settingType) {
    case 'ADDON':
      text = 'Addon Setting';
      break;
    case 'RETOUCHING':
      text = 'Retouching Setting';
      break;
    default:
      text = 'Advance Setting';
      break;
  }

  if ((advanceSetting || []).some((el) => el.type === settingType)) {
    return (
      <>
        <Col span="24">
          <Divider orientation="left">{text}</Divider>
        </Col>
        <Col span="24">
          <div className="advance-setting__list">
            {advanceSetting
              .filter((el) => el.type === settingType)
              .sort((a, b) => (a.text || '').localeCompare(b.text || ''))
              .map((setting, index) => (
                <Checkbox
                  // checked={codes[setting.value]}
                  checked={(settingIds || []).includes(setting.value)}
                  onChange={({ target: { checked } }) =>
                    onChangeAdvance(setting.value)
                  }
                  key={index}
                >
                  {setting.text} - ${setting.price}
                </Checkbox>
              ))}
          </div>
        </Col>
      </>
    );
  } else {
    return null;
  }
};

export default SettingOptions;

import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { CloseOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import CanvasDraw from 'react-canvas-draw';
import { cloneDeep } from 'lodash';
import './styles.less';

const { TextArea } = Input;

const ImageComment = ({
  visible,
  commentsList,
  imageDrawData,
  imgSrc,
  imgWidth,
  imgHeight,
  onOk,
  onCancel,
}) => {
  const [currentColor, setCurrentColor] = useState(COLOR_ARRAY[0]);
  const [comments, setComments] = useState(
    commentsList || [{ content: '', color: currentColor }]
  );
  const saveableCanvas = useRef(null);
  const onAddComment = () => {
    const commentsClone = cloneDeep(comments);
    const newColor = COLOR_ARRAY[commentsClone.length];
    commentsClone.push({ content: '', color: newColor });
    setComments(commentsClone);
    setCurrentColor(newColor);
  };
  const onChangeComment = (index, event) => {
    const commentsClone = cloneDeep(comments);
    const comment = commentsClone[index];
    comment.content = event.target.value;
    setComments(commentsClone);
  };
  const onDeleteComment = (index) => {
    let commentsClone = cloneDeep(comments);
    commentsClone.splice(index, 1);
    setComments(commentsClone);
  };
  const onClickInput = (index) => {
    setCurrentColor(COLOR_ARRAY[index]);
  };
  const onLocalOk = () => {
    onOk &&
      onOk({
        comments,
        imageDrawData: saveableCanvas.current.getSaveData(),
      });
  };
  const onLocalCancel = () => {
    saveableCanvas && saveableCanvas.current.clear();
    onCancel && onCancel();
  };
  const onUndo = () => {
    saveableCanvas && saveableCanvas.current.undo();
  };

  const { width: canvasWidth, height: canvasHeight } = reCaculatorImageSize(
    imgWidth,
    imgHeight
  );
  return (
    <>
      <Modal
        destroyOnClose={true}
        centered
        title="Image comment"
        visible={visible}
        onOk={onLocalOk}
        onCancel={onLocalCancel}
        width={1024}
      >
        <div className="modal-image-comment__body">
          <div>
            <CanvasDraw
              ref={saveableCanvas}
              brushColor={currentColor}
              catenaryColor="#000000"
              lazyRadius={0}
              brushRadius={2}
              saveData={imageDrawData}
              imgSrc={imgSrc}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
            <div className="btn-undo-wrapper">
              <Button onClick={onUndo} shape="circle" icon={<UndoOutlined />} />
            </div>
          </div>
          <div>
            <div className="image-comment__list-comment">
              {comments.map((comment, index) => {
                return (
                  <div
                    key={index}
                    className="image-comment__list-comment-item gx-mb-2"
                  >
                    <div
                      style={{
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                        width: 30,
                        backgroundColor: comment.color,
                      }}
                    />
                    <TextArea
                      value={comment.content}
                      onClick={() => onClickInput(index)}
                      onChange={(e) => onChangeComment(index, e)}
                      rows={2}
                    />
                    <Button
                      onClick={() => onDeleteComment(index)}
                      size="small"
                      danger
                      className="comment-item_button--delete gx-ml-2"
                      type="dashed"
                      shape="circle"
                      icon={<CloseOutlined />}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              onClick={onAddComment}
              className="gx-mt-2"
              size="small"
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Comment
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ImageComment;

const COLOR_ARRAY = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#99FF99',
  '#B34D4D',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#CCFF1A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

const reCaculatorImageSize = (width, height) => {
  const staticWidth = 500;
  const newHeight = (staticWidth / width) * height;
  return {
    width: staticWidth,
    height: newHeight,
  };
};

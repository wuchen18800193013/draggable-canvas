import { useState } from 'react';
import { Switch } from 'antd';
import DraggableWrapper from './draggable-wrapper';
import DraggableList from './draggable-list';

const Container = () => {
  const [isEdit, setIsedit] = useState(false);

  return (
    <>
      <Switch onChange={(checked) => setIsedit(checked)} /> &nbsp;开启编辑
      <DraggableWrapper isEdit={isEdit} width={1000} height={1000}>
        <DraggableList isEdit={isEdit} />
      </DraggableWrapper>
    </>
  );
};

export default Container;
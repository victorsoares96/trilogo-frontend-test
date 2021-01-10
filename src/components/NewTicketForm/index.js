import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const NewTicketForm = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = (values) => {
    console.log(values);
    message.success(JSON.stringify(values));
    closeModal();
  }
  return (
    <>
      <Form
        layout='vertical'
        form={form}
        initialValues={{
          layout: 'vertical',
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
        onFinish={handleSubmit}
        onValuesChange={props => console.log(props)}
      >
        <Form.Item label="Descrição" required>
          <Input name='description' placeholder="Digite uma descrição:" style={{ width: '100%', borderRadius: 4 }} />
        </Form.Item>
        <Form.Item label="Tipo" required>
          <Select defaultValue="default" style={{ width: '100%', borderRadius: 4 }} loading={false}>
            <Option value="default" disabled>Selecione um tipo:</Option>
            <Option value="bem">Bem</Option>
            <Option value="predial">Predial</Option>
            <Option value="procedimento">Procedimento</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Responsável" required>
          <Select defaultValue="default" style={{ width: '100%', borderRadius: 4 }} loading={false}>
            <Option value="default" disabled>Selecione um responsável:</Option>
            <Option value="joao">João</Option>
            <Option value="maria">Maria</Option>
            <Option value="jose">José</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Responsável">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              Arraste uma imagem para anexar ao ticket
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item style={{ display: 'flex', marginLeft: 'auto', marginTop: 10 }}>
          <Button key="submit" type="primary" htmlType='submit' shape='round' loading={false}>
            Criar ticket
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewTicketForm;
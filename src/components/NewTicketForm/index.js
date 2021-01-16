/* eslint-disable no-restricted-globals */
import React from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

/* Helper's */
import toBase64 from '../../utils/toBase64';
import { addCard } from '@lourenci/react-kanban';
import getRandomInt from '../../utils/getRandomInt';

const NewTicketForm = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: false,
    method: 'get',
    accept: "image/png, image/jpeg",
    action: 'https://api.github.com/',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const { image } = values;
    
    try {
      const board = JSON.parse(localStorage.getItem('@board:'));
      const resultImage = await toBase64(image[0].originFileObj);
      console.log(resultImage)
      const newBoard = addCard(board, { id: 1 }, {
        ...values,
        id: getRandomInt(1, 1000),
        image: resultImage,
      });
      localStorage.setItem('@board:', JSON.stringify(newBoard));
      message.success('Adicionado!', 2, function () {
        location.reload();
      });

      form.resetFields();
      closeModal();
    } catch (error) {
      message.error('Um erro ocorreu.');
      console.log(error);
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList
  };
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
      >
        <Form.Item 
        name='description' 
        label="Descrição" 
        rules={[
          {
            required: true,
            message: 'Digite uma descrição!',
          },
        ]}
        required>
          <Input placeholder="Digite uma descrição:" style={{ width: '100%', borderRadius: 4 }} />
        </Form.Item>
        
        <Form.Item 
        name='type' 
        label="Tipo" 
        rules={[
          {
            required: true,
            message: 'Selecione um tipo!',
          },
        ]}
        required>
          <Select defaultValue="default" style={{ width: '100%', borderRadius: 4 }} loading={false}>
            <Option value="default" disabled>Selecione um tipo:</Option>
            <Option value="Bem">Bem</Option>
            <Option value="Predial">Predial</Option>
            <Option value="Procedimento">Procedimento</Option>
          </Select>
        </Form.Item>
        
        <Form.Item 
        name='responsible' 
        label="Responsável" 
        rules={[
          {
            required: true,
            message: 'Selecione um responsável!',
          },
        ]}
        required>
          <Select defaultValue="default" style={{ width: '100%', borderRadius: 4 }} loading={false}>
            <Option value="default" disabled>Selecione um responsável:</Option>
            <Option value="João">João</Option>
            <Option value="Maria">Maria</Option>
            <Option value="José">José</Option>
          </Select>
        </Form.Item>

        <Form.Item name='image' label="Imagem" valuePropName='fileList' getValueFromEvent={normFile}>
          <Dragger {...props} name='image'>
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
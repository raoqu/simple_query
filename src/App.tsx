import React from 'react';
import { Card, Col, Row, Divider, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './App.css';
import { useState } from 'react';

interface FormData {
  username: string;
  mobile: string;
}


function App() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState("\n");

  const handleSubmit = (values: FormData) => {
    setSubmitting(true);
    setTimeout(() => {
      axios.post('/api/query', values)
        .then((response) => {
          setResult(response.data);
        })
        .catch(() => {
          setResult("查询失败")
        })
        .finally(() => {
          setSubmitting(false);
        })
    }, 500);
  };

  function Text(responseText: string) {
    const lines = responseText.split("\n");
    return (
      <div>
        {lines.map((line, index) => {
          return (
            <React.Fragment key={index}>
              <span>{line}</span>
              {index !== lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <Card title="成绩查询" bordered={false}>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="username" label="学　号">
              <Row justify="center"><Col><Input /></Col></Row>
            </Form.Item >
            <Form.Item name="mobile" label="手机号">
              <Row justify="center"><Col><Input /></Col></Row>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
              <Button type="primary" htmlType="submit" disabled={submitting}>
                {submitting ? '正在查询中...' : '查询'}
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          {Text(result)}
        </Card>
      </Col>
    </Row>
  );
}

export default App;

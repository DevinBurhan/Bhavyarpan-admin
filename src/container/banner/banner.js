import React, { useState } from "react";
import { Button, Table, Space, Modal, Form, Input } from "antd";
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const BannerPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        const newData = {
            key: count,
            title: values.title,
            description: values.description,
            smallImage: values.smallImage,
            largeImage: values.largeImage,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const columns = [
        {
            title: "Sr. No",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Small Image",
            dataIndex: "smallImage",
            key: "smallImage",
        },
        {
            title: "Large Image",
            dataIndex: "largeImage",
            key: "largeImage",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="" icon={<EditOutlined />} size="small">
                        Edit
                    </Button>
                    <Button type="" icon={<DeleteOutlined />} size="small">
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <h1 className="col-lg" style={{ fontSize: "2em" }}>
                Banner Page
            </h1>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <Button type="default" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleModalOpen}>
                    Add Banner
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />

            <AddBannerModal visible={isModalOpen} onCancel={handleModalClose} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
    );
};

const AddBannerModal = ({ visible, onCancel, onFinish, onFinishFailed }) => {
    const [form] = Form.useForm();

    const handleFinish = () => {
        form.validateFields()
            .then((values) => {
                onFinish(values);
                form.resetFields();
            })
            .catch((errorInfo) => {
                onFinishFailed(errorInfo);
            });
    };

    return (
        <Modal title="Add Banner" open={visible} onCancel={onCancel} onOk={handleFinish} destroyOnClose okText="Submit" cancelText="Cancel">
            <Form
                form={form}
                name="addBanner"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                    <Input placeholder="Enter title" />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                    <Input.TextArea placeholder="Enter description" />
                </Form.Item>

                <Form.Item label="Small Image" name="smallImage" rules={[{ required: true, message: "Please input the small image URL!" }]}>
                    <Input placeholder="Enter small image URL" />
                </Form.Item>

                <Form.Item label="Large Image" name="largeImage" rules={[{ required: true, message: "Please input the large image URL!" }]}>
                    <Input placeholder="Enter large image URL" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BannerPage;

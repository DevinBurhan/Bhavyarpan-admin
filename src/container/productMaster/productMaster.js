import React, { useState } from "react";
import { Button, Table, Space, Modal, Form, Input } from "antd";
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCategoiryAPI, deleteCategoiryAPI, getproductMasterAPI, updateCategoiryAPI } from "../../redux/productMasterredux/actionCreator";

const ProductMasterPage = () => {
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
            mainImage: values.mainImage,
            behindImage: values.behindImage,
            subsidiaryImage: values.subsidiaryImage,
            beforePrice: values.beforePrice,
            afterPrice: values.afterPrice,
            saveRs: values.saveRs,
            inStockQuantity: values.inStockQuantity,
            outStockQuantity: values.outStockQuantity,
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
            title: "Main Image",
            dataIndex: "mainImage",
            key: "mainImage",
        },
        {
            title: "Behind Image",
            dataIndex: "behindImage",
            key: "behindImage",
        },
        {
            title: "Subsidiary Images",
            dataIndex: "subsidiaryImage",
            key: "subsidiaryImage",
        },
        {
            title: "Before Price",
            dataIndex: "beforePrice",
            key: "beforePrice",
        },
        {
            title: "After Price",
            dataIndex: "afterPrice",
            key: "afterPrice",
        },
        {
            title: "Save Rs",
            dataIndex: "saveRs",
            key: "saveRs",
        },
        {
            title: "In Stock Quantity",
            dataIndex: "inStockQuantity",
            key: "inStockQuantity",
        },
        {
            title: "Out Stock Quantity",
            dataIndex: "outStockQuantity",
            key: "outStockQuantity",
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
                Product Master
            </h1>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <Button type="default" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleModalOpen}>
                    Add ProductMaster
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />

            <AddProductModal visible={isModalOpen} onCancel={handleModalClose} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
    );
};

const AddProductModal = ({ visible, onCancel, onFinish, onFinishFailed }) => {
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
        <Modal title="Add Product" open={visible} onCancel={onCancel} onOk={handleFinish} destroyOnClose okText="Submit" cancelText="Cancel">
            <Form
                form={form}
                name="addProduct"
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

                <Form.Item label="Main Image" name="mainImage" rules={[{ required: true, message: "Please input the main image!" }]}>
                    <Input placeholder="Enter main image URL" />
                </Form.Item>

                <Form.Item label="Behind Image" name="behindImage">
                    <Input placeholder="Enter behind image URL" />
                </Form.Item>

                <Form.Item label="Subsidiary Image" name="subsidiaryImage">
                    <Input placeholder="Enter subsidiary image URL" />
                </Form.Item>

                <Form.Item label="Before Price" name="beforePrice" rules={[{ required: true, message: "Please input the before price!" }]}>
                    <Input placeholder="Enter before price" />
                </Form.Item>

                <Form.Item label="After Price" name="afterPrice" rules={[{ required: true, message: "Please input the after price!" }]}>
                    <Input placeholder="Enter after price" />
                </Form.Item>

                <Form.Item label="Save Rs" name="saveRs">
                    <Input placeholder="Enter save Rs" />
                </Form.Item>

                <Form.Item label="In Stock Quantity" name="inStockQuantity" rules={[{ required: true, message: "Please input the in stock quantity!" }]}>
                    <Input placeholder="Enter in stock quantity" />
                </Form.Item>

                <Form.Item label="Out Stock Quantity" name="outStockQuantity" rules={[{ required: true, message: "Please input the out stock quantity!" }]}>
                    <Input placeholder="Enter out stock quantity" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductMasterPage;

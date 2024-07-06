import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Space, Table, Upload, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { addSubcategoryAPI, deleteSubcategoryAPI, getSubcategoriesAPI, updateSubcategoryAPI } from "../../redux/subcategoryredux/actionCreator";

const SubcategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalOpen, setIsModalOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const data = useSelector((state) => state.subcategoryReducer.Subcategories);

    useEffect(() => {
        // Call get API on component mount
        getSubcategoryList();
    }, []);

    const getSubcategoryList = async () => {
        await dispatch(getSubcategoriesAPI());
    };

    const onFinish = async (values) => {
        if (selectedId !== null) {
            // Update existing subcategory
            let resp = await dispatch(updateSubcategoryAPI(selectedId, values));
            if (resp) {
                form.resetFields();
                setSelectedId(null);
                setIsModalOpen(false);
                getSubcategoryList();
            }
        } else {
            // Add new subcategory
            let resp = await dispatch(addSubcategoryAPI(values));
            if (resp) {
                form.resetFields();
                setSelectedId(null);
                setIsModalOpen(false);
                getSubcategoryList();
            }
        }
    };

    const handleEdit = async (record) => {
        setSelectedId(record._id);
        setIsModalOpen(true);
        form.setFieldsValue(record);
    };

    const handleDelete = async (record) => {
        let resp = await dispatch(deleteSubcategoryAPI(record._id));
        if (resp) {
            getSubcategoryList();
        }
    };

    const handleCancel = () => {
        setSelectedId(null);
        form.resetFields();
        setIsModalOpen(false);
    };

    const uploadProps = {
        name: "file",
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const columns = [
        {
            title: "Sr. No",
            dataIndex: "serial",
            key: "serial",
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
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                <Button type="" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Add Subcategory
                </Button>
            </div>

            <Table columns={columns} dataSource={data} />

            <Modal
                title={selectedId !== null ? "Edit Subcategory" : "Add Subcategory"}
                open={modalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubcategoryPage;

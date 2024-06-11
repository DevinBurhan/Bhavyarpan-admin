import React, { useState } from "react";
import { Button, Upload, Form, Input, message, Modal, Table, Space } from "antd";
import { UploadOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const App = () => {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    const toggleCategoryForm = () => {
        setShowCategoryForm(!showCategoryForm);
        setEditingCategory(null);
    };

    const onFinish = (values) => {
        console.log("Success:", values);
        if (editingCategory !== null) {
            const updatedCategories = categories.map((cat, index) => (index === editingCategory ? values : cat));
            setCategories(updatedCategories);
        } else {
            setCategories([...categories, values]);
        }
        toggleCategoryForm();
    };

    const handleEdit = (index) => {
        console.log("Edit:", index);
        setEditingCategory(index); // Set the index of the category being edited
        setShowCategoryForm(true); // Show the category form
    };

    const handleDelete = (index) => {
        console.log("Delete:", index);
        setCategories(categories.filter((_, idx) => idx !== index));
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
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <img src={text} alt="category" style={{ width: 50 }} />,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record, index) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(index)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(index)}>
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
                <Button type="primary" icon={<PlusOutlined />} onClick={toggleCategoryForm}>
                    Add
                </Button>
            </div>

            <Table columns={columns} dataSource={categories} />

            <Modal title={editingCategory !== null ? "Edit Category" : "Add Category"} visible={showCategoryForm} onCancel={toggleCategoryForm} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        initialValue={editingCategory !== null ? categories[editingCategory].title : ""}
                        rules={[{ required: true, message: "Please input the title!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        initialValue={editingCategory !== null ? categories[editingCategory].description : ""}
                        rules={[{ required: true, message: "Please input the description!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                        rules={[{ required: true, message: "Please upload an image!" }]}
                    >
                        <Upload {...uploadProps} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default App;

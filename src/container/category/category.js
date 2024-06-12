import React, { useEffect, useState } from "react";
import { Button, Upload, Form, Input, message, Modal, Table, Space } from "antd";
import { UploadOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addCategoiryAPI, getCategoiryAPI, updateCategoiryAPI, deleteCategoiryAPI } from "../../redux/categoryredux/actionCreator";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const data = useSelector((state) => state);
    console.log("vvv", data.categoryReducer.Categories);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        let resp = await dispatch(getCategoiryAPI());
    };

    // const updateCategoryList = async () => {
    //     let resp = await dispatch(updateCategoiryAPI());
    // };
    // const deleteCategoryList = async () => {
    //     let resp = await dispatch(deleteCategoiryAPI());
    // };

    const toggleCategoryForm = () => {
        setShowCategoryForm(!showCategoryForm);
        setSelectedId(null);
    };

    const onFinish = async (values) => {
        console.log("values:", values);
        if (selectedId !== null) {
            const updatedCategories = categories.map((cat, index) => (index === selectedId ? values : cat));
            setCategories(updatedCategories);
        } else {
            let resp = await dispatch(addCategoiryAPI(values));
        }
        toggleCategoryForm();
    };

    const handleEdit = async (id, values) => {
        console.log("values:", values);
        setSelectedId(id);
        setShowCategoryForm(true);
        let resp = await dispatch(updateCategoiryAPI(values));
    };

    const handleDelete = async (values) => {
        console.log("Delete:", values);
        setCategories(categories.filter((_, idx) => idx !== values));
        let resp = await dispatch(deleteCategoiryAPI(values));
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
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
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

            <Modal title={selectedId !== null ? "Edit Category" : "Add Category"} visible={showCategoryForm} onCancel={toggleCategoryForm} footer={null}>
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
                        initialValue={selectedId !== null ? categories[selectedId].title : ""}
                        rules={[{ required: true, message: "Please input the title!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        initialValue={selectedId !== null ? categories[selectedId].description : ""}
                        rules={[{ required: true, message: "Please input the description!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="file"
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

export default CategoryPage;

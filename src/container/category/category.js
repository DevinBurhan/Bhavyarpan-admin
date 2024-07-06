import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoiryAPI, deleteCategoiryAPI, getCategoiryAPI, updateCategoiryAPI } from "../../redux/categoryredux/actionCreator";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const data = useSelector((state) => state.categoryReducer.Categories);

    useEffect(() => {
        //by default call get API on every render
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        let resp = await dispatch(getCategoiryAPI());
    };

    const onFinish = async (values) => {
        if (selectedId !== null) {
            //Edit function will call here because we have value of ID set in handleEdit Sucntion
            let resp = await dispatch(updateCategoiryAPI(selectedId, values));
            //if resp is true then set all variable to default state and call get API to get the latest data
            if (resp) {
                form.resetFields();
                setSelectedId();
                setIsModalOpen(false);
                getCategoryList();
            }
        } else {
            //Add category API will call here because selectedId is empty
            values.image = values.file[0];
            delete values.file;
            let resp = await dispatch(addCategoiryAPI(values));
            //if resp is true then set all variable to default state and call get API to get the latest data
            if (resp) {
                form.resetFields();
                setSelectedId();
                setIsModalOpen(false);
                getCategoryList();
            }
        }
    };

    const handleEdit = async (record) => {
        console.log("record", record._id);
        setSelectedId(record._id);
        // open modal and setSelectedvalue
        // setSelectedId(record._id);
        setIsModalOpen(true);
        form.setFieldsValue(record); //set Antd Form Value on EDIT
    };

    const handleDelete = async (record) => {
        console.log("Record", record._id);
        // delwete record with this id directly
        let resp = await dispatch(deleteCategoiryAPI(record._id));
        if (resp) {
            getCategoryList();
        }
    };
    const handleCancel = () => {
        setSelectedId(null);
        form.resetFields();
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
            render: (record, index) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        Delete
                        {/* Are you sure want to delete this category */}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                }}
            >
                <Button type="" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Add Category
                </Button>
            </div>

            <Table columns={columns} dataSource={data?.data} />

            <Modal title={selectedId !== null ? "Edit Category" : "Add Category"} open={modalOpen} onCancel={handleCancel} onOk={form.submit} okText="Submit">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
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
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryPage;

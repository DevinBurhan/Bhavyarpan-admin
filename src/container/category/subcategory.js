import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Space, Table, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubcategoryAPI, deleteSubcategoryAPI, getSubcategoriesAPI, updateSubcategoryAPI } from "../../redux/subcategoryredux/actionCreator";

const { Option } = Select;

const SubcategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [mediaFile, setMediaFile] = useState();
    const [mediaPreview, setMediaPreview] = useState();

    const data = useSelector((state) => state.subcategoryReducer.Subcategories);

    useEffect(() => {
        getsubCategoryList();
    }, []);

    const getsubCategoryList = async () => {
        setIsLoading(true);
        await dispatch(getSubcategoriesAPI());
        setIsLoading(false);
    };

    const onFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("title", values.title);
        form_data.append("description", values.description);
        form_data.append("categoryId", values.categoryId);
        let resp;

        if (selectedId !== null) {
            resp = await dispatch(updateSubcategoryAPI(selectedId, form_data));
        } else {
            resp = await dispatch(addSubcategoryAPI(form_data));
        }

        if (resp) {
            form.resetFields();
            setSelectedId(null);
            setIsModalOpen(false);
            setMediaPreview(undefined);
            setMediaFile(undefined);
            getsubCategoryList();
        } else {
            getsubCategoryList();
        }
        setIsLoading(false);
    };

    const handleEdit = async (record) => {
        setSelectedId(record._id);
        setIsModalOpen(true);
        form.setFieldsValue(record);
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this subcategory?",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteSubcategoryAPI(record._id));
                    if (resp) {
                        getsubCategoryList();
                    }
                }
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMediaFile(undefined);
        setMediaPreview(undefined);
        setSelectedId(null);
        form.resetFields();
    };

    const handleChangeMedia = (selectedFile) => {
        if (!selectedFile) return;
        setMediaPreview(URL.createObjectURL(selectedFile));
        setMediaFile(selectedFile);
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
            title: "Category",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId) => {
                return (
                    <Select defaultValue={categoryId} style={{ width: 120 }}>
                        {/* Replace with actual categories fetched from API */}
                        <Option value="1">Category 1</Option>
                        <Option value="2">Category 2</Option>
                        <Option value="3">Category 3</Option>
                    </Select>
                );
            },
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
        <>
            <div className="pageHeading">
                <Row gutter={20} justify={"space-between"}>
                    <Col>
                        <h2>SubCategory</h2>
                    </Col>
                    <Col>
                        <Row gutter={[20, 20]}>
                            <Col>
                                <Input type="search" placeholder="Search subcategory" style={{ marginBottom: "25px" }} prefix={<SearchOutlined />} />
                            </Col>
                            <Col>
                                <Button style={{ height: "47.56px" }} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                    Add subCategory
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={data?.data} loading={isLoading} />

                <Modal
                    title={selectedId !== null ? "Edit subCategory" : "Add subCategory"}
                    visible={modalOpen}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={isLoading} onClick={() => form.submit()}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
                            <Select placeholder="Select a category">
                                {/* Replace with actual categories fetched from API */}
                                <Option value="1">Category 1</Option>
                                <Option value="2">Category 2</Option>
                                <Option value="3">Category 3</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default SubcategoryPage;

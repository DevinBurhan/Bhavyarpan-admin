import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoiryAPI, deleteCategoiryAPI, getCategoiryAPI, updateCategoiryAPI } from "../../redux/categoryredux/actionCreator";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); //loadder
    const [selectedId, setSelectedId] = useState(null);
    const [mediaFile, setMediaFile] = useState(); //store file
    const [mediaPreview, setMediaPreview] = useState(); //store preview img

    const data = useSelector((state) => state.categoryReducer.Categories);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        setIsLoading(true);
        await dispatch(getCategoiryAPI());
        setIsLoading(false);
    };

    const onFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("title", values.title);
        form_data.append("description", values.description);

        let resp;

        if (selectedId !== null) {
            //update logic
            delete values.image;
            if (mediaFile) {
                form_data.append("image", mediaFile);
            }

            for (const pair of form_data.entries()) {
                console.log("pair : ", pair);
            }
            resp = await dispatch(updateCategoiryAPI(selectedId, form_data)); //update api
        } else {
            //add logic
            if (!mediaFile) {
                message.error("Please add category image");
                return false;
            }
            delete values.image;
            form_data.append("image", mediaFile);
            resp = await dispatch(addCategoiryAPI(form_data)); //add api
        }
        //coo
        if (resp) {
            form.resetFields();
            setSelectedId();
            setIsModalOpen(false);
            setMediaPreview();
            setMediaFile();
            getCategoryList();
        } else {
            getCategoryList();
        }
    };

    const handleEdit = async (record) => {
        console.log("record", record._id);
        setMediaPreview(record.image);
        setSelectedId(record._id);
        setIsModalOpen(true);
        form.setFieldsValue(record); //set Antd Form Value on EDIT
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this category",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteCategoiryAPI(record._id));
                    if (resp) {
                        getCategoryList();
                    }
                }
            },
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setMediaFile();
        setMediaPreview();
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
                        <h2>Category</h2>
                    </Col>
                    <Col>
                        <Row gutter={[20, 20]}>
                            <Col>
                                <Input type="search" placeholder={"Search categroy"} style={{ marginBottom: "25px" }} prefix={<SearchOutlined />} />
                            </Col>
                            <Col>
                                <Button style={{ height: "47.56px" }} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                    Add Category
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={data?.data} loading={isLoading} />

                <Modal
                    title={selectedId !== null ? "Edit Category" : "Add Category"}
                    open={modalOpen}
                    onCancel={handleCancel}
                    onOk={form.submit}
                    okText="Submit"
                    confirmLoading={isLoading}
                >
                    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item label="Image" name="image">
                            <Input
                                type="file"
                                title={"Add Image"}
                                onChange={(event) => handleChangeMedia(event.target.files[0])}
                                accept="image/jpeg,image/png,image/svg"
                                aria-label="Upload File"
                            />
                            {mediaPreview && (
                                <img
                                    alt="img"
                                    src={mediaPreview}
                                    width={100}
                                    height={100}
                                    style={{
                                        float: "right",
                                        display: "flex",
                                        objectFit: "contain",
                                        marginTop: "10px",
                                        border: "1px solid black",
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default CategoryPage;

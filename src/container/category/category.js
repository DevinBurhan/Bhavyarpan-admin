import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoiryAPI, deleteCategoiryAPI, getCategoiryAPI, updateCategoiryAPI } from "../../redux/categoryredux/actionCreator";
import { Download, UploadCloud } from "feather-icons-react/build/IconComponents";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [modalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); //loadder
    const [selectedId, setSelectedId] = useState(null);
    console.log("file: category.js:15  CategoryPage  selectedId", selectedId);
    const [mediaFile, setMediaFile] = useState(); //store file
    const [mediaPreview, setMediaPreview] = useState(); //store preview img

    const data = useSelector((state) => state.categoryReducer.Categories);

    useEffect(() => {
        getApi(true, page, limit);
    }, []);

    const getApi = async (pagination, page, limit) => {
        setIsLoading(true);
        let params = {
            pagination,
            page,
            limit,
        };
        await dispatch(getCategoiryAPI(params));
        setIsLoading(false);
    };

    const onPageChange = async (page) => {
        setPage(page);
        getApi(true, page, limit);
    };
    const onFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("title", values.title);
        form_data.append("description", values.description);

        let resp;

        if (selectedId && selectedId !== "") {
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
        console.log("resp at 70:", resp);
        if (resp) {
            form.resetFields();
            setSelectedId();
            setIsModalOpen(false);
            setMediaPreview();
            setMediaFile();
            getApi(true, page, limit);
        } else {
            getApi(true, page, limit);
        }
    };

    const handleEdit = async (record) => {
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
                        getApi(true, page, limit);
                    }
                }
            },
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setMediaFile();
        setMediaPreview();
        setSelectedId();
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
            render: (text, object, index) => index + 1 + (page - 1) * limit,
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
                                <a
                                    //   href={DOWNLOAD_FILE_NAME}
                                    href="#"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    //   download={DOWNLOAD_FILE_NAME}
                                >
                                    <Button type="primary" icon={<Download size={20} />}>
                                        Download Template
                                    </Button>
                                </a>
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    icon={<UploadCloud size={20} />}
                                    //   onClick={() => setIsModalOpen(true)}
                                >
                                    Upload CSV
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                    }}
                                >
                                    Add Category
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={data?.data}
                    loading={isLoading}
                    pagination={{
                        showSizeChanger: false,
                        pageSize: limit,
                        total: data?.totalCount,
                        current: page,
                        onChange: onPageChange,
                    }}
                />

                <Modal
                    title={selectedId && selectedId !== "" ? "Edit Category" : "Add Category"}
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

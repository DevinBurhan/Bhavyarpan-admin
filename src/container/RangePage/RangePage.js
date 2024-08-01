import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, InputNumber, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRangeAPI, deleteRangeAPI, getRangeAPI, updateRangeAPI } from "../../redux/rangeRedux/actionCreator";

const RangePage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); //loadder
    const [selectedId, setSelectedId] = useState(null);
    const [mediaFile, setMediaFile] = useState(); //store file
    const [mediaPreview, setMediaPreview] = useState();

    const data = useSelector((state) => state?.rangeReducer?.content);
    console.log("file: RangePage.js:19  RangePage  data", data);

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

        await dispatch(getRangeAPI(params));
        setIsLoading(false);
    };

    const handleEdit = (record) => {
        setSelectedId(record?._id);
        setMediaPreview(record?.image);
        form.setFieldsValue(record); //set Antd Form Value on EDIT
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMediaFile();
        setMediaPreview();
        setSelectedId(null);
        form.resetFields();
    };

    const onPageChange = async (page) => {
        setPage(page);
        getApi(true, page, limit);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this range",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteRangeAPI(record._id));
                    if (resp) {
                        getApi(true, page, limit);
                    }
                }
            },
        });
    };

    const handleFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("underRange", values.underRange);

        let resp;

        if (selectedId !== null) {
            delete values.image;

            if (mediaFile) {
                form_data.append("image", mediaFile);
            }

            for (const pair of form_data.entries()) {
                console.log("pair : ", pair);
            }
            resp = await dispatch(updateRangeAPI(selectedId, form_data)); //update api
        } else {
            //add logic
            if (!mediaFile) {
                message.error("Please add image");
                return false;
            }
            if (mediaFile) {
                form_data.append("image", mediaFile);
            }

            resp = await dispatch(addRangeAPI(form_data)); //add api
        }
        if (resp) {
            handleCancel();
            getApi(true, page, limit);
        } else {
            getApi(true, page, limit);
        }
    };

    const handleChangeMediaLarge = (selectedFile) => {
        if (!selectedFile) return;
        setMediaPreview(URL.createObjectURL(selectedFile));
        setMediaFile(selectedFile);
    };

    const columns = [
        {
            title: "Sr. No",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => {
                console.log("file: RangePage.js:115  RangePage  text", text);
                return <Image src={text} alt="Large" style={{ width: 150, height: "auto", objectFit: "cover" }} />;
            },
        },
        {
            title: "Under Range",
            dataIndex: "underRange",
            key: "title",
        },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="pageHeading">
            <Row gutter={20} justify={"space-between"}>
                <Col>
                    <h2>Define Range</h2>
                </Col>
                <Col>
                    <Row gutter={[20, 20]}>
                        <Col>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                Add Range
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Table
                dataSource={data && data.data ? data.data : []}
                columns={columns}
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
                title={selectedId && selectedId !== "" ? "Edit Range" : "Add Range"}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={form.submit}
                destroyOnClose
                okText="Submit"
                cancelText="Cancel"
                confirmLoading={isLoading}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Under Range" name="underRange" rules={[{ required: true, message: "Please input the Range!" }]}>
                        <Input type="number" placeholder="Enter Range" />
                    </Form.Item>

                    <Form.Item label="Desktop Image" name="image">
                        <Input
                            type="file"
                            title={"Add Image"}
                            onChange={(event) => handleChangeMediaLarge(event.target.files[0])}
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
    );
};

export default RangePage;

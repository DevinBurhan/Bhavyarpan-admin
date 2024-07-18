import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { addAdvertismentAPI, deleteAdvertismentAPI, getAdvertismentAPI, updateAdvertismentAPI } from "../../redux/advertismentredux/actionCreator";

const { Option } = Select;

const AdvertismentPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [mediaFile, setMediaFile] = useState();
    const [mediaPreview, setMediaPreview] = useState();
    const [type, setType] = useState("image");

    const data = useSelector((state) => state.advertismentReducer.getAdvertisment);

    useEffect(() => {
        getAdverismentList();
    }, []);

    const getAdverismentList = async () => {
        setIsLoading(true);
        await dispatch(getAdvertismentAPI());
        setIsLoading(false);
    };
    // console.log("getAdverismentList-----------", getAdverismentList);
    const onFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("type", values.type);
        form_data.append("duration", values.duration);

        let resp;

        if (selectedId !== null) {
            // Update logic
            delete values.adsUrl;
            if (mediaFile) {
                form_data.append("adsUrl", mediaFile);
            }
            for (const pair of form_data.entries()) {
                console.log("pair : ", pair);
            }

            resp = await dispatch(updateAdvertismentAPI(selectedId, form_data));
        } else {
            // Add logic
            if (!mediaFile) {
                message.error("Please add advertisement image");
                return false;
            }
            delete values.adsUrl;
            form_data.append("adsUrl", mediaFile);
            resp = await dispatch(addAdvertismentAPI(form_data));
        }

        if (resp) {
            form.resetFields();
            setSelectedId();
            setIsModalOpen(false);
            setMediaPreview();
            setMediaFile();
            getAdverismentList();
        } else {
            setIsLoading(false);
        }
    };

    const handleEdit = async (record) => {
        setSelectedId(record._id);
        setMediaPreview(record.adsUrl);
        setIsModalOpen(true);
        form.setFieldsValue(record);
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this advertisement?",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteAdvertismentAPI(record._id));
                    if (resp) {
                        getAdverismentList();
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

    const handleChangeMedia = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMediaFile(file);
            setMediaPreview(URL.createObjectURL(file));
            setType(file.type.startsWith("image") ? "image" : "video");
        }
    };

    const handleTypeChange = (value) => {
        setType(value);
    };

    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Upload",
            dataIndex: "adsUrl",
            key: "upload",
            render: (adsUrl, record) => {
                if (record.type === "image") {
                    return <img src={adsUrl} alt="upload" style={{ width: 50 }} />;
                } else if (record.type === "video") {
                    return (
                        <video width="50" height="50" controls>
                            <source src={adsUrl} type="video/mp4" />
                        </video>
                    );
                }
                return null;
            },
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
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
        <div className="pageHeading">
            <Row gutter={20} justify="space-between">
                <Col>
                    <h2>Advertisement</h2>
                </Col>
                <Col>
                    <Row gutter={[20, 20]}>
                        <Col>
                            <Input type="search" placeholder="Search Advertisement" style={{ marginBottom: "25px" }} prefix={<SearchOutlined />} />
                        </Col>
                        <Col>
                            <Button style={{ height: "47.56px" }} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                Add Advertisement
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Table columns={columns} dataSource={data?.data} loading={isLoading} />

            <Modal
                title={selectedId !== null ? "Edit Advertisement" : "Add Advertisement"}
                open={modalOpen}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Submit"
                confirmLoading={isLoading}
            >
                <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
                    <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please select the type!" }]}>
                        <Select onChange={handleTypeChange}>
                            <Option value="image">Image</Option>
                            <Option value="video">Video</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Upload" name="adsUrl">
                        <input
                            type="file"
                            onChange={handleChangeMedia}
                            accept="image/jpeg,image/png,image/svg+xml,video/mp4,video/mpeg"
                            aria-label="Upload File"
                        />
                        {type === "image" && mediaPreview && (
                            <img alt="Preview" src={mediaPreview} width={100} height={100} style={{ float: "right", objectFit: "contain", marginTop: 10 }} />
                        )}
                        {type === "video" && <p></p>}
                    </Form.Item>

                    <Form.Item label="Duration" name="duration" rules={[{ required: true, message: "Please input the duration!" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdvertismentPage;

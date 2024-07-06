import React, { useState } from "react";
import { Button, Table, Space, Modal, Form, Input, Upload, message } from "antd";
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const BannerPage = () => {
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null); // State to store selected banner for editing
    const [count, setCount] = useState(0);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        setSelectedBanner(null); // Clear selected banner when modal opens for adding new
    };

    const handleEdit = (record) => {
        setSelectedBanner(record);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBanner(null);
    };

    const handleDelete = (record) => {
        const newData = dataSource.filter((item) => item.key !== record.key);
        setDataSource(newData);
    };

    const onFinish = (values) => {
        if (selectedBanner) {
            // Update existing banner
            const updatedBanner = {
                ...selectedBanner,
                title: values.title,
                description: values.description,
                smallImage: values.smallImage,
                largeImage: values.largeImage,
            };
            const updatedData = dataSource.map((item) => (item.key === selectedBanner.key ? updatedBanner : item));
            setDataSource(updatedData);
        } else {
            // Add new banner
            const newData = {
                key: count,
                title: values.title,
                description: values.description,
                smallImage: values.smallImage,
                largeImage: values.largeImage,
            };
            setDataSource([...dataSource, newData]);
            setCount(count + 1);
        }
        setIsModalOpen(false);
        setSelectedBanner(null);
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
            title: "Small Image",
            dataIndex: "smallImage",
            key: "smallImage",
            render: (text) => <img src={text} alt="Small" style={{ width: 100, height: 50, objectFit: "cover" }} />,
        },
        {
            title: "Large Image",
            dataIndex: "largeImage",
            key: "largeImage",
            render: (text) => <img src={text} alt="Large" style={{ width: 100, height: 100, objectFit: "cover" }} />,
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
        <div style={{ padding: 30 }}>
            <h1 className="col-lg" style={{ fontSize: "2em" }}>
                Banner Page
            </h1>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <Button type="default" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleModalOpen}>
                    Add Banner
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />

            <AddBannerModal
                visible={isModalOpen}
                onCancel={handleModalClose}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                selectedBanner={selectedBanner} // Pass selectedBanner state to modal
            />
        </div>
    );
};

const AddBannerModal = ({ visible, onCancel, onFinish, onFinishFailed, selectedBanner }) => {
    const [form] = Form.useForm();

    // Set initial form values if editing existing banner
    React.useEffect(() => {
        if (selectedBanner) {
            form.setFieldsValue({
                title: selectedBanner.title,
                description: selectedBanner.description,
                smallImage: selectedBanner.smallImage,
                largeImage: selectedBanner.largeImage,
            });
        }
    }, [form, selectedBanner]);

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
                // Here you can update form field with the uploaded image URL
                form.setFieldsValue({
                    smallImage: info.file.response.url, // Assuming the API responds with the image URL
                });
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Modal
            title={selectedBanner ? "Edit Banner" : "Add Banner"}
            open={visible}
            onCancel={onCancel}
            onOk={handleFinish}
            destroyOnClose
            okText="Submit"
            cancelText="Cancel"
        >
            <Form form={form} name="addBanner" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} autoComplete="off">
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                    <Input placeholder="Enter title" />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                    <Input.TextArea placeholder="Enter description" />
                </Form.Item>

                <Form.Item label="Small Image" name="smallImage" rules={[{ required: true, message: "Please input the small image URL!" }]}>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Large Image" name="largeImage" rules={[{ required: true, message: "Please input the large image URL!" }]}>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BannerPage;

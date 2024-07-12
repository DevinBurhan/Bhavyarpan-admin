import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBannerAPI, deleteBannerAPI, getBannerAPI, updateBannerAPI } from "../../redux/bannerredux/actionCreator";
import { getCategoiryAPI } from "../../redux/categoryredux/actionCreator";

const BannerPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //loadder
    const [selectedId, setSelectedId] = useState(null);
    const [mediaFileLarge, setMediaFileLarge] = useState(); //store file
    const [mediaPreviewLarge, setMediaPreviewLarge] = useState(); //store preview img
    const [mediaFileSmall, setMediaFileSmall] = useState(); //store file
    const [mediaPreviewSmall, setMediaPreviewSmall] = useState(); //store preview img

    const data = useSelector((state) => state?.bannerReducer?.banner);
    console.log("file: banner.js:22  BannerPage  data", data);
    const categoryList = useSelector((state) => state?.categoryReducer?.Categories);
    console.log("file: banner.js:22  BannerPage  categoryList", categoryList);

    useEffect(() => {
        getApi();
        getCategoryList();
    }, []);

    const getApi = async () => {
        setIsLoading(true);
        await dispatch(getBannerAPI());
        setIsLoading(false);
    };
    const getCategoryList = async () => {
        setIsLoading(true);
        let params = {
            pagination: false,
        };
        await dispatch(getCategoiryAPI(params));
        setIsLoading(false);
    };

    const handleEdit = (record) => {
        setSelectedId(record?._id);
        setMediaPreviewLarge(record?.largeImage);
        setMediaPreviewSmall(record?.smallImage);
        form.setFieldsValue(record); //set Antd Form Value on EDIT
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMediaFileLarge();
        setMediaFileSmall();
        setMediaPreviewSmall();
        setMediaPreviewLarge();

        setSelectedId(null);
        form.resetFields();
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this category",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteBannerAPI(record._id));
                    if (resp) {
                        getApi();
                    }
                }
            },
        });
    };

    const handleFinish = async (values) => {
        setIsLoading(true);
        const form_data = new FormData();

        form_data.append("title", values.title);
        form_data.append("description", values.description);
        form_data.append("category", values.category);

        let resp;

        if (selectedId !== null) {
            //update logic
            delete values.largeImage;
            delete values.smallImage;
            if (mediaFileLarge) {
                form_data.append("largeImage", mediaFileLarge);
            }
            if (mediaFileSmall) {
                form_data.append("smallImage", mediaFileSmall);
            }

            for (const pair of form_data.entries()) {
                console.log("pair : ", pair);
            }
            resp = await dispatch(updateBannerAPI(selectedId, form_data)); //update api
        } else {
            //add logic
            if (!mediaFileLarge) {
                message.error("Please add large image");
                return false;
            }
            if (!mediaFileSmall) {
                message.error("Please add small image");
                return false;
            }
            form_data.append("largeImage", mediaFileLarge);
            form_data.append("smallImage", mediaFileSmall);
            resp = await dispatch(addBannerAPI(form_data)); //add api
        }
        //coo
        if (resp) {
            handleCancel();
            getApi();
        } else {
            getApi();
        }
    };

    const handleChangeMediaLarge = (selectedFile) => {
        if (!selectedFile) return;
        setMediaPreviewLarge(URL.createObjectURL(selectedFile));
        setMediaFileLarge(selectedFile);
    };

    const handleChangeMediaSmall = (selectedFile) => {
        if (!selectedFile) return;
        setMediaPreviewSmall(URL.createObjectURL(selectedFile));
        setMediaFileSmall(selectedFile);
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
            title: "Large Image",
            dataIndex: "largeImage",
            key: "largeImage",
            render: (text) => <img src={text} alt="Large" style={{ width: 150, height: "auto", objectFit: "cover" }} />,
        },
        {
            title: "Small Image",
            dataIndex: "smallImage",
            key: "smallImage",
            render: (text) => <img src={text} alt="Small" style={{ width: 150, height: "auto", objectFit: "cover" }} />,
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
                    <h2>Banner</h2>
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

            <Table dataSource={data && data.data ? data.data : []} columns={columns} loading={isLoading} />

            <Modal
                title={selectedBanner ? "Edit Banner" : "Add Banner"}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={form.submit}
                destroyOnClose
                okText="Submit"
                cancelText="Cancel"
                confirmLoading={isLoading}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                        <Input placeholder="Enter title" />
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                        <Input.TextArea placeholder="Enter description" />
                    </Form.Item>
                    <Form.Item label="Select Category" name="category" rules={[{ required: true, message: "Please input the description!" }]}>
                        <Select
                            showSearch
                            placeholder="Select a person"
                            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        >
                            {categoryList?.data?.length > 0 &&
                                categoryList.data.map((item, ind) => (
                                    <Select.Option key={ind} value={item._id}>
                                        {console.log("item", item)}
                                        {item?.title}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Desktop Image" name="largeImage">
                        <Input
                            type="file"
                            title={"Add Image"}
                            onChange={(event) => handleChangeMediaLarge(event.target.files[0])}
                            accept="image/jpeg,image/png,image/svg"
                            aria-label="Upload File"
                        />
                        {mediaPreviewLarge && (
                            <img
                                alt="img"
                                src={mediaPreviewLarge}
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

                    <Form.Item label="Mobile Image" name="smallImage">
                        <Input
                            type="file"
                            title={"Add Image"}
                            onChange={(event) => handleChangeMediaSmall(event.target.files[0])}
                            accept="image/jpeg,image/png,image/svg"
                            aria-label="Upload File"
                        />
                        {mediaPreviewSmall && (
                            <img
                                alt="img"
                                src={mediaPreviewSmall}
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

export default BannerPage;

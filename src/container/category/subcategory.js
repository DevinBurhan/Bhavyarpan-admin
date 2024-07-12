import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoiryAPI } from "../../redux/categoryredux/actionCreator";
import { addSubcategoryAPI, deleteSubcategoryAPI, getSubcategoriesAPI, updateSubcategoryAPI } from "../../redux/subcategoryredux/actionCreator";

const SubCategoryPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedsubCategory, setSelectedsubCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //loadder
    const [selectedId, setSelectedId] = useState(null);

    const data = useSelector((state) => state?.subcategoryReducer?.subCategory);
    console.log("file: subcategory.js:18  SubCategoryPage  data", data);
    const categoryList = useSelector((state) => state?.categoryReducer?.Categories);
    console.log("file: SubCategory.js:22  SubCategoryPage  categoryList", data);

    useEffect(() => {
        getApi(true, page, limit);
        getCategoryList();
    }, []);

    const getApi = async (pagination, page, limit) => {
        setIsLoading(true);
        let params = {
            pagination,
            page,
            limit,
        };
        await dispatch(getSubcategoriesAPI(params));
        setIsLoading(false);
    };
    const onPageChange = async (page) => {
        setPage(page);
        getApi(true, page, limit);
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
        form.setFieldsValue(record); //set Antd Form Value on EDIT
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedId(null);
        form.resetFields();
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this category",
            onOk: async () => {
                if (record._id) {
                    let resp = await dispatch(deleteSubcategoryAPI(record._id));
                    if (resp) {
                        getApi();
                    }
                }
            },
        });
    };
    const handleFinish = async (values) => {
        setIsLoading(true);

        let resp;

        if (selectedId !== null) {
            //update logic

            resp = await dispatch(updateSubcategoryAPI(selectedId, values)); //update api
        } else {
            //add logic

            resp = await dispatch(addSubcategoryAPI(values)); //add api
        }
        // console.log("safdsfgf");
        if (resp) {
            handleCancel();
            getApi();
        } else {
            getApi();
        }
    };

    const columns = [
        {
            title: "Sr. No",
            dataIndex: "key",
            key: "key",
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
                    <h2>SubCategory</h2>
                </Col>
                <Col>
                    <Row gutter={[20, 20]}>
                        <Col>{/* <Input type="search" placeholder={"Search categroy"} style={{ marginBottom: "25px" }} prefix={<SearchOutlined />} /> */}</Col>
                        <Col>
                            <Button style={{ height: "47.56px" }} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                Add Subcategory
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
                title={selectedsubCategory ? "Edit subCategory" : "Add subCategory"}
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
                            size="large"
                            showSearch
                            placeholder="Select Category"
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
                </Form>
            </Modal>
        </div>
    );
};

export default SubCategoryPage;

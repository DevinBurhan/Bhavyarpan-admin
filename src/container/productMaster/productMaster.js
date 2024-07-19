import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  deleteproductMasterAPI,
  getproductMasterAPI,
} from "../../redux/productMasterredux/actionCreator";

import DOWNLOAD_FILE_NAME from "../../assets/bhavyarpan-csv-template.csv";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const ProductMasterPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvFile, setIsCsvFile] = useState();
  const [isLoading, setIsLoading] = useState(false); //loadder

  const data = useSelector(
    (state) => state?.productMasterReducer?.productMaster
  );

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
    await dispatch(getproductMasterAPI(params));
    setIsLoading(false);
  };
  const onPageChange = async (page) => {
    setPage(page);
    getApi(true, page, limit);
  };

  const handleCsvChange = (file) => {
    setIsCsvFile(file.file.originFileObj);
  };
  const onFinish = async (values) => {};

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Product?",
      onOk: async () => {
        if (record._id) {
          let resp = await dispatch(deleteproductMasterAPI(record._id));
          if (resp) {
            getApi(true, page, limit);
          }
        }
      },
    });
  };
  const columns = [
    {
      title: "Sr. No",
      dataIndex: "_id",
      key: "key",
      render: (text, object, index) => index + 1 + (page - 1) * limit,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     key: "description",
    // // },
    // {
    //     title: "Main Image",
    //     dataIndex: "mainImage",
    //     key: "mainImage",
    // },
    // {
    //     title: "Behind Image",
    //     dataIndex: "behindImage",
    //     key: "behindImage",
    // },
    // {
    //     title: "Subsidiary Images",
    //     dataIndex: "subsidiaryImage",
    //     key: "subsidiaryImage",
    // },
    {
      title: "Before Price",
      dataIndex: "beforePrice",
      key: "beforePrice",
    },
    {
      title: "After Price",
      dataIndex: "afterPrice",
      key: "afterPrice",
    },
    // {
    //     title: "Save Rs",
    //     dataIndex: "saveRs",
    //     key: "saveRs",
    // },
    {
      title: "In Stock Quantity",
      dataIndex: "inStockQuantity",
      key: "inStockQuantity",
    },
    {
      title: "Out Stock Quantity",
      dataIndex: "outStockQuantity",
      key: "outStockQuantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/productMaster/add?query=${record?._id}`}>
            <Button type="" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Button
            type=""
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record)}
          >
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
              <a
                href={DOWNLOAD_FILE_NAME}
                target="_blank"
                rel="noreferrer noopener"
                download={DOWNLOAD_FILE_NAME}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Download Template
                </Button>
              </a>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Upload CSV
              </Button>
            </Col>
            <Col>
              <Link to={`/productMaster/add`}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Product
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        loading={isLoading}
        dataSource={data?.data?.length > 0 ? data.data : []}
        columns={columns}
        pagination={{
          showSizeChanger: false,
          pageSize: limit,
          total: data?.totalCount,
          current: page,
          onChange: onPageChange,
        }}
      />

      <Modal
        title={"Upload CSv "}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={onFinish}
        destroyOnClose
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={isLoading}
      >
        <Row justify={"center"}>
          <Col xs={24} md={6}>
            <Upload
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleCsvChange}
              multiple={false}
            >
              <Button>
                <FeatherIcon icon="upload-cloud" />
                Click To Upload
              </Button>
            </Upload>
          </Col>
          {csvFile && (
            <Col
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  marginLeft: "70px",
                  cursor: "pointer",
                }}
                onClick={() => setIsCsvFile()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z"
                    fill="#ED5565"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.81797 15.8891L15.889 8.81809C16.084 8.62309 16.084 8.30609 15.889 8.11109C15.694 7.91609 15.377 7.91609 15.182 8.11109L8.11097 15.1821C7.91597 15.3771 7.91597 15.6941 8.11097 15.8891C8.30597 16.0841 8.62297 16.0841 8.81797 15.8891Z"
                    fill="#F3F3F3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.889 15.1821L8.81797 8.11109C8.62297 7.91609 8.30597 7.91609 8.11097 8.11109C7.91597 8.30609 7.91597 8.62309 8.11097 8.81809L15.182 15.8891C15.377 16.0841 15.694 16.0841 15.889 15.8891C16.084 15.6941 16.084 15.3771 15.889 15.1821Z"
                    fill="#F3F3F3"
                  />
                </svg>
              </div>
              <FeatherIcon icon="file-text" size={100} />
            </Col>
          )}
        </Row>
      </Modal>
    </div>
  );
};

export default ProductMasterPage;

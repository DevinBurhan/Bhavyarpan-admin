import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteproductMasterAPI,
  getproductMasterAPI,
} from "../../redux/productMasterredux/actionCreator";
import { Link } from "react-router-dom";

const ProductMasterPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
  const handleModalOpen = () => {};

  const handleModalClose = () => {
    setIsModalOpen(false);
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
    <div style={{ padding: 30 }}>
      <h1 className="col-lg" style={{ fontSize: "2em" }}>
        Product Master
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        {/* <Button type="default" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
                    Search
                </Button> */}
        <Link to={`/productMaster/add`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add ProductMaster
          </Button>
        </Link>
      </div>

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
    </div>
  );
};

export default ProductMasterPage;

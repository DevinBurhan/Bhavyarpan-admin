import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Space, Table } from "antd";
import { Upload } from "feather-icons-react/build/IconComponents";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageUploadAPI,
  getImageUploadAPI,
} from "../../redux/uploadredux/actionCreator";
import { reArrangeSequence } from "../../utility/commonFunction";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Upload Images");
  const [isLoading, setIsLoading] = useState(false); //loadder
  const [selectedId, setSelectedId] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [render, setRender] = useState(false);

  const data = useSelector((state) => state?.uploadReducer?.list);

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
    await dispatch(getImageUploadAPI(params));
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImagesArray([]);
    setSelectedId(null);
    form.resetFields();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Image",
      onOk: async () => {
        if (record._id) {
          let resp = await dispatch(
            deleteImageUploadAPI({ ids: [record._id] })
          );
          if (resp) {
            getApi(true, page, limit);
          }
        }
      },
    });
  };

  const handleFinish = async (values) => {};

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
      title: " Image",
      dataIndex: "image",
      key: "Image",
      render: (src) => (
        <img
          src={src}
          alt="Image"
          style={{ width: 150, height: "auto", objectFit: "cover" }}
        />
      ),
    },
    {
      title: " Copy Url",
      dataIndex: "image",
      key: "URL",
      render: (src) => <spna>{src}</spna>,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Large Image",
    //   dataIndex: "largeImage",
    //   key: "largeImage",
    //   render: (text) => (
    //     <img
    //       src={text}
    //       alt="Large"
    //       style={{ width: 150, height: "auto", objectFit: "cover" }}
    //     />
    //   ),
    // },
    // {
    //   title: "Small Image",
    //   dataIndex: "smallImage",
    //   key: "smallImage",
    //   render: (text) => (
    //     <img
    //       src={text}
    //       alt="Small"
    //       style={{ width: 150, height: "auto", objectFit: "cover" }}
    //     />
    //   ),
    // },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
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
  const handleRemoveClick = (myIndex) => {
    let newArray = reArrangeSequence(myIndex, imagesArray);
    setImagesArray(newArray);
    setRender(!render);
  };

  const handleUploadChange = async (file) => {
    if (imagesArray.length >= 10) {
      message.error("The maximum allowed number of images for upload is 10.");
      return false;
    }

    let newImageTemp = imagesArray;
    let obj = {};
    obj.src = await getBase64(file.file.originFileObj);
    obj.id = file.file.uid;
    obj.file = file.file;
    console.log("objobj", obj);
    newImageTemp.push(obj);
    setImagesArray(newImageTemp);

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  };

  return (
    <div className="pageHeading">
      <Row gutter={20} justify={"space-between"}>
        <Col>
          <h2>Upload Image</h2>
        </Col>
        <Col>
          <Row gutter={[20, 20]}>
            <Col>
              {/* <Input
                type="search"
                placeholder={"Search categroy"}
                style={{ marginBottom: "25px" }}
                prefix={<SearchOutlined />}
              /> */}
            </Col>
            <Col>
              <Button
                style={{ height: "47.56px" }}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Upload Image
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        dataSource={data && data.data ? data.data : []}
        columns={columns}
        loading={isLoading}
      />

      {setIsModalOpen && (
        <Row justify={"center"}>
          <Col span={6}>
            <div className="upload-box">
              <Upload
                className="upload-button"
                onChange={handleUploadChange}
                fileList={imagesArray}
                multiple
              >
                <Button>Upload Image</Button>
              </Upload>
            </div>
            <div className="upload-list">
              <Row gutter={[20, 20]}>
                {imagesArray.map((item, index) => (
                  <Col span={4} key={index}>
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "-5px",
                        }}
                        onClick={() => handleRemoveClick(index)}
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
                      <img
                        src={item.src}
                        alt="img"
                        width={100}
                        height={100}
                        style={{
                          background: "grey",
                          borderRadius: "20px",
                          width: "100%",
                          height: "225px",
                          float: "right",
                          display: "flex",
                          objectFit: "cover",
                          marginTop: "10px",
                          border: "1px solid black",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
              <Row justify={"center"} style={{ marginTop: "25px" }}>
                <Col>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
      {/* <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
        destroyOnClose
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={isLoading}
      >
        <Row>
          <Col span={24}>
            <div className="upload-box">
              <Upload
                className="upload-button"
                onChange={handleUploadChange}
                fileList={imagesArray}
                multiple
              >
                <Button>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
        </Row>
        <div className="upload-list">
          <Row gutter={[20, 20]}>
            {imagesArray.map((item, index) => (
              <Col span={4} key={index}>
                <img
                  src={item.src}
                  alt="img"
                  width={100}
                  height={100}
                  style={{
                    background: "grey",
                    borderRadius: "20px",
                    width: "100%",
                    height: "225px",
                    float: "right",
                    display: "flex",
                    objectFit: "cover",
                    marginTop: "10px",
                    border: "1px solid black",
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Modal> */}
    </div>
  );
};

export default UploadPage;

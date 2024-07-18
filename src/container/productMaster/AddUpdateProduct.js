import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoiryAPI } from "../../redux/categoryredux/actionCreator";
import {
  addproductMasterAPI,
  getproductMasterDetailAPI,
  updateproductMasterAPI,
} from "../../redux/productMasterredux/actionCreator";
import { getSubcategoriesAPI } from "../../redux/subcategoryredux/actionCreator";

import { useNavigate } from "react-router-dom";
import { reArrangeSequence } from "../../utility/commonFunction";
import "./Product.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddUpdateProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); //loadder
  const [value, setValue] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  console.log("🚀 ~ AddUpdateProduct ~ imagesArray:", imagesArray);
  const [mainImgPreview, setMainImgPreview] = useState();
  const [mainImgFile, setMainImgFile] = useState();
  const [behindImgPreview, setBehindImgPreview] = useState();
  const [behindImgFile, setBehindFile] = useState();
  const [render, setRender] = useState(false);
  const [productId, setProductId] = useState();

  const categoryList = useSelector(
    (state) => state?.categoryReducer?.Categories
  );
  const subCategoryList = useSelector(
    (state) => state?.subcategoryReducer?.subCategory
  );

  useEffect(() => {
    let ID = window.location.href.split("=");
    // console.log("file: AddUpdateProduct.js:45  useEffect  ID", ID.length);
    if (ID.length === 2) {
      let store = ID.pop();
      setProductId(store);
      getApi(store);
    }
    getCategoryList();
  }, []);

  const getApi = async (id) => {
    setIsLoading(true);
    let resp = await dispatch(getproductMasterDetailAPI(id));
    if (resp) {
      let array = [];
      if (resp?.data?.subsidaryImages?.length > 0) {
        resp.data.subsidaryImages.map((item, index) => {
          let obj = {};
          obj.src = item;
          obj.id = 0;
          obj.file = undefined;

          array.push(obj);
        });
      }
      setImagesArray(array);
      getSubCategoryList(resp.data.category);
      setValue(resp.data.isEnabledMinQuantity);
      setMainImgPreview(resp.data.mainImage);
      setBehindImgPreview(resp.data.behindImage);
      form.setFieldsValue(resp.data);
    }
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

  const getSubCategoryList = async (value) => {
    setIsLoading(true);
    let params = {
      categoryId: value,
      pagination: false,
    };
    await dispatch(getSubcategoriesAPI(params));
    setIsLoading(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleChangeMainImage = (selectedFile) => {
    if (!selectedFile) return;
    setMainImgPreview(URL.createObjectURL(selectedFile));
    setMainImgFile(selectedFile);
  };

  const handleChangeBehindImage = (selectedFile) => {
    if (!selectedFile) return;
    setBehindImgPreview(URL.createObjectURL(selectedFile));
    setBehindFile(selectedFile);
  };
  const handleUploadChange = async (file) => {
    if (imagesArray.length >= 60) {
      message.error("The maximum allowed number of images for upload is 60.");

      return false;
    }

    let newImageTemp = imagesArray;
    let obj = {};
    obj.src = await getBase64(file.file.originFileObj);
    obj.id = file.file.uid;
    obj.file = file.file;
    newImageTemp.push(obj);
    setImagesArray(newImageTemp);

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  };

  const handleRemoveClick = (myIndex) => {
    let newArray = reArrangeSequence(myIndex, imagesArray);
    setImagesArray(newArray);
    setRender(!render);
  };

  const handleFinish = async (values) => {
    const form_data = new FormData();
    delete values.mainImage;
    delete values.behindImage;
    if (mainImgFile) {
      form_data.append("mainImage", mainImgFile);
    }
    if (behindImgFile) {
      form_data.append("behindImage", behindImgFile);
    }
    if (!value) {
      form_data.append("minOrderQuantity", 1);
    }
    if (imagesArray !== "" && imagesArray.length > 0) {
      if (imagesArray.length === 1) {
        if (imagesArray[0].src) {
          form_data.append(
            `subsidaryImages`,
            ...[
              imagesArray[0].file.originFileObj
                ? imagesArray[0].file.originFileObj
                : imagesArray[0].file,
            ]
          );
        }
      } else {
        for (let i = 0; i < imagesArray.length; i++) {
          if (imagesArray[i].file) {
            form_data.append(
              `subsidaryImages`,
              imagesArray[i].file.originFileObj
            );
          }
        }
      }
    }
    if (productId && productId !== "") {
      delete values.productSku;

      const appendValues = (obj, prefix = "") => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const currentKey = prefix ? `${prefix}[${key}]` : key;
            if (typeof value === "object" && value !== null) {
              appendValues(value, currentKey);
            } else {
              form_data.append(currentKey, value);
            }
          }
        }
      };
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const value = values[key];

          if (typeof value === "object" && value !== null) {
            appendValues(value, key);
          } else {
            // Append non-nested values directly
            form_data.append(key, value);
          }
        }
      }
      for (const pair of form_data.entries()) {
        console.log("handleSaveCourseDetails : ", pair, typeof pair[1]);
      }

      const resp = await dispatch(updateproductMasterAPI(productId, form_data));
      if (resp) {
        form.resetFields();
        getApi(productId);
      }
    } else if (!productId) {
      const appendValues = (obj, prefix = "") => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const currentKey = prefix ? `${prefix}[${key}]` : key;
            if (typeof value === "object" && value !== null) {
              appendValues(value, currentKey);
            } else {
              form_data.append(currentKey, value);
            }
          }
        }
      };
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const value = values[key];

          if (typeof value === "object" && value !== null) {
            appendValues(value, key);
          } else {
            // Append non-nested values directly
            form_data.append(key, value);
          }
        }
      }
      for (const pair of form_data.entries()) {
        console.log("handleSaveCourseDetails : ", pair, typeof pair[1]);
      }

      const resp = await dispatch(addproductMasterAPI(form_data));
    }
  };

  return (
    <div className="pageHeading">
      <Row gutter={20} justify={"space-between"}>
        <Col>
          <h2>Add Product</h2>
        </Col>
      </Row>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "center",
        }}
      >
        <Row gutter={[20, 0]}>
          <Col span={24} md={18}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              label="Product SKU"
              name="productSku"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                disabled={productId && productSku !== "" ? true : false}
                placeholder="Enter Product SKU"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Enter description" />
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="Select Category"
              name="category"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Select
                size={"large"}
                showSearch
                placeholder="Select Category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={(value) => {
                  getSubCategoryList(value);
                }}
              >
                {categoryList?.data?.length > 0 &&
                  categoryList.data.map((item, ind) => (
                    <Select.Option key={ind} value={item._id}>
                      {item?.title}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="Select Subcategory"
              name="subCategory"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Select
                size={"large"}
                showSearch
                placeholder="Select Subcategory"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {subCategoryList?.data?.length > 0 &&
                  subCategoryList.data.map((item, ind) => (
                    <Select.Option key={ind} value={item._id}>
                      {item?.title}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="Before Price"
              name="beforePrice"
              rules={[
                { required: true, message: "Please input before price!" },
              ]}
            >
              <Input type="number" placeholder="Enter Price" />
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="After Price"
              name="afterPrice"
              rules={[{ required: true, message: "Please input after price!" }]}
            >
              <Input type="number" placeholder="Enter Price" />
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="InStock Quantity"
              name="inStockQuantity"
              rules={[
                { required: true, message: "Please input InStock Quantity!" },
              ]}
            >
              <Input type="number" placeholder="Enter Quantity" />
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="OutStock Quantity"
              name="outStockQuantity"
              rules={[
                { required: true, message: "Please input OutStock Quantity!" },
              ]}
            >
              <Input type="number" placeholder="Enter Quantity" />
            </Form.Item>
          </Col>

          <Col span={24} md={6}>
            <Form.Item
              label="Do you want minimum order Quantity?"
              name="isEnabledMinQuantity"
              rules={[
                { required: true, message: "Please input OutStock Quantity!" },
              ]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {value ? (
            <Col span={24} md={6}>
              <Form.Item
                label="Minimum Order Quantity"
                name="minOrderQuantity"
                rules={[
                  {
                    required: true,
                    message: "Please input Minimum Order Quantity!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Quantity" />
              </Form.Item>
            </Col>
          ) : (
            <Col span={24} md={6}></Col>
          )}

          <Col span={24} md={4}>
            <Form.Item
              label="Volume Weight"
              name={["dimensions", "volumeWeight"]}
              rules={[
                { required: true, message: "Please enter volume weight!" },
              ]}
            >
              <Input type="number" placeholder="Enter Volume Weight" />
            </Form.Item>
          </Col>

          <Col span={24} md={4}>
            <Form.Item
              label="Prod Weight"
              name={["dimensions", "prodWeight"]}
              rules={[{ required: true, message: "Please enter Prod weight!" }]}
            >
              <Input type="number" placeholder="Enter Prod Weight" />
            </Form.Item>
          </Col>

          <Col span={24} md={4}>
            <Form.Item
              label="Ship Weight"
              name={["dimensions", "shipWeight"]}
              rules={[{ required: true, message: "Please enter Ship weight!" }]}
            >
              <Input type="number" placeholder="Enter Ship Weight" />
            </Form.Item>
          </Col>

          <Col span={24} md={4}>
            <Form.Item
              label="Length"
              name={["dimensions", "length"]}
              rules={[{ required: true, message: "Please enter Length!" }]}
            >
              <Input type="number" placeholder="Enter Length" />
            </Form.Item>
          </Col>

          <Col span={24} md={4}>
            <Form.Item
              label="Breadth"
              name={["dimensions", "breadth"]}
              rules={[{ required: true, message: "Please enter Breadth!" }]}
            >
              <Input type="number" placeholder="Enter Breadth" />
            </Form.Item>
          </Col>

          <Col span={24} md={4}>
            <Form.Item
              label="Height"
              name={["dimensions", "height"]}
              rules={[{ required: true, message: "Please enter Height!" }]}
            >
              <Input type="number" placeholder="Enter Height" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Main Image" name="mainImage">
              <Input
                type="file"
                title={"Add Image"}
                onChange={(event) =>
                  handleChangeMainImage(event.target.files[0])
                }
                accept="image/jpeg,image/png,image/svg"
                aria-label="Upload File"
              />
              {mainImgPreview && (
                <img
                  alt="img"
                  src={mainImgPreview}
                  width={100}
                  height={100}
                  style={{
                    width: "100%",
                    height: "auto",
                    float: "right",
                    display: "flex",
                    objectFit: "contain",
                    marginTop: "10px",
                    border: "1px solid black",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Behind Image" name="behindImage">
              <Input
                type="file"
                title={"Add Image"}
                onChange={(event) =>
                  handleChangeBehindImage(event.target.files[0])
                }
                accept="image/jpeg,image/png,image/svg"
                aria-label="Upload File"
              />
              {behindImgPreview && (
                <img
                  alt="img"
                  src={behindImgPreview}
                  width={100}
                  height={100}
                  style={{
                    width: "100%",
                    height: "auto",
                    float: "right",
                    display: "flex",
                    objectFit: "contain",
                    marginTop: "10px",
                    border: "1px solid black",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
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
      </Form>
    </div>
  );
};
export default AddUpdateProduct;

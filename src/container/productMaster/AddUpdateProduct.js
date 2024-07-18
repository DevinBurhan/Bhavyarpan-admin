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

import "./Product.css";
import { useNavigate } from "react-router-dom";

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
      console.log("file: AddUpdateProduct.js:46  useEffect  ID", store);
      setProductId(store);
      getApi(store);
    }
    // console.log("file: AddUpdateProduct.js:42  useEffect  ID", ID);
    getCategoryList();
  }, []);

  const getApi = async (id) => {
    setIsLoading(true);
    let resp = await dispatch(getproductMasterDetailAPI(id));
    console.log("file: AddUpdateProduct.js:56  getApi  resp", resp);
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
    console.log("file: AddUpdateProduct.js:56  handleUploadChange  file", file);
    if (imagesArray.length >= 60) {
      message.error("The maximum allowed number of images for upload is 60.");

      return false;
    }
    // if (!checkFileType(file.file)) {
    //     setUploadLoader(false);
    //     return false;
    // }
    // const fileSize = file.file.size;
    // const fileSizeInKB = fileSize / 1024;
    // if (fileSizeInKB > 500) {
    //     handleModal(true, "Size validation", "Images larger than 500KB will not be  uploaded.");
    //     setUploadLoader(false);
    //     return false;
    // }
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
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleFinish}
        layout="vertical"
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
                // beforeUpload={beforeUpload}

                className="upload-button"
                onChange={handleUploadChange}
                fileList={imagesArray}
                multiple
              >
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-upload"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>{" "}
                  Upload Image
                </button>
              </Upload>
            </div>
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
              <Row justify={"center"}>
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

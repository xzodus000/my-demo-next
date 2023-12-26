"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "./styles.css";
import { Card, Col, Popconfirm, Row, Table, Tag } from "antd";
import ModalAction from "./component/modalAction";
import {
  TodoDto,
  actionToDo,
  statusToDo,
} from "../../../interface/enum/toDo/toDo.interface";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { deleteToDo, listToDO } from "../../../service/todo.service";
const { format } = require("date-fns");
const FormPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dataToDo, setDataToDo] = useState([]);
  const [dataInProgress, setDataInprogress] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [dataSelected, setDataSelected] = useState<any>(undefined);
  const [action, setAction] = useState(actionToDo.CREATE);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await listToDO();

    if (res?.status === 200 && res.data.length > 0) {
      const data = res.data;

      setDataToDo(
        data.filter((item: TodoDto) => {
          return item.status === statusToDo.TODO;
        })
      );

      setDataInprogress(
        data.filter((item: TodoDto) => {
          return item.status === statusToDo.INPROGRESS;
        })
      );

      setDataDone(
        data.filter((item: TodoDto) => {
          return item.status === statusToDo.DONE;
        })
      );
    }
  };

  const convertDateUct = (data: any) => {
    const currentDate = new Date(data);
    const utcString = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
      timeZone: "UTC",
    });

    return utcString;
  };

  const updateTodo = (data?: TodoDto) => {
    setDataSelected(data);
    setAction(actionToDo.UPDATE);
    setOpen(true);
  };

  return (
    <div>
      <h1>To do list</h1>
      <Row gutter={16}>
        <Col span={8}>
          <h1>To Do</h1>
          {dataToDo.map((item: TodoDto) => {
            return (
              <div key={item._id} className="my-card">
                <Card title={`${item.title}   `} bordered={false}>
                  <div className="content-card">
                    {item.description}
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tag color="magenta">To do</Tag>

                      <div>
                        <EditOutlined
                          onClick={() => {
                            updateTodo(item);
                          }}
                          // style={{ zIndex: 2 }}
                          className="my-trash"
                        />

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => {
                            deleteToDo(item._id);
                            fetchData();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="my-trash" />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </Col>
        <Col span={8}>
          <h1>In progress</h1>
          {dataInProgress.map((item: TodoDto) => {
            return (
              <div key={item._id} className="my-card">
                <Card title={`${item.title}   `} bordered={false}>
                  <div className="content-card">
                    {item.description}
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tag color="gold">Inprogress</Tag>

                      <div>
                        <EditOutlined
                          onClick={() => {
                            updateTodo(item);
                          }}
                          className="my-trash"
                        />

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => {
                            deleteToDo(item._id);
                            fetchData();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="my-trash" />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </Col>
        <Col span={8}>
          <h1>Done</h1>
          {dataDone.map((item: TodoDto) => {
            return (
              <div key={item._id} className="my-card">
                <Card title={`${item.title}   `} bordered={false}>
                  <div className="content-card">
                    {item.description}
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tag color="green">Done</Tag>

                      <div>
                        <EditOutlined
                          onClick={() => {
                            updateTodo(item);
                          }}
                          className="my-trash"
                        />

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => {
                            deleteToDo(item._id);
                            fetchData();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="my-trash" />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </Col>
      </Row>
      <button
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => {
          setAction(actionToDo.CREATE);
          setOpen(true);
        }}
      >
        <PlusCircleOutlined className="my-plus" />
      </button>
      <ModalAction
        data={dataSelected}
        action={action}
        modalOpen={open}
        setModalOpen={setOpen}
        fetchData={fetchData}
      />
    </div>
  );
};

export default FormPage;

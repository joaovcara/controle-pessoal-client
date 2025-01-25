import React, { useState, useEffect } from "react";
import { Button, Col, Input, Row, Space, Typography } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import Table, { ColumnType } from "antd/es/table";
import ModalLayout from "../Modal/ModalLayout";
import { useMediaQuery } from 'react-responsive';

interface TableBaseProps<T = unknown> {
  pageTitle: string;
  pageIcon: React.ReactNode;
  data: T[];
  columnsData: ColumnType<T>[];
  tituloAcaoIncluir: string;
  formulario: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalWidth?: string | number;
  onDownload: () => void;
}

const TableBase = <T extends object>({
  pageTitle,
  pageIcon,
  data,
  columnsData,
  tituloAcaoIncluir,
  formulario,
  isModalOpen,
  setIsModalOpen,
  modalWidth,
  onDownload,
}: TableBaseProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        columnsData.some((col) => {
          const value = col.render ? col.render(item[col.dataIndex as keyof T], item, 0) : item[col.dataIndex as keyof T];
          return String(value).toLowerCase().includes(searchText.toLowerCase());
        })
      )
    );
  }, [searchText, data, columnsData]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }} justify="space-between">
        <Col>
          <Space size="middle" align="center">
            <div style={{ fontSize: 25 }}>{pageIcon}</div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {pageTitle}
            </Typography.Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => setIsModalOpen(true)}
            >
              Novo
            </Button>
            <Button
              type="default"
              icon={<DownloadOutlined />}
              size="middle"
              onClick={() => onDownload()}
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: 10 }}>
        <Col xs={24} md={24}>
          <div style={{ display: "flex", justifyContent: isMobile ? "flex-start" : "flex-end" }}>
            <Input.Search
              placeholder="Pesquisar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: isMobile ? "100%" : 400 }}
            />
          </div>
        </Col>
      </Row>
      <Table<T>
        scroll={{ x: "max-content" }}
        columns={columnsData}
        dataSource={filteredData}
        size="middle"
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={{ pageSize: 10 }}
      />
      <ModalLayout
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titulo={tituloAcaoIncluir}
        formulario={formulario}
        width={isMobile ? "90%" : modalWidth}
      />
    </>
  );
};

export default TableBase;
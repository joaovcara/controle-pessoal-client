import { Button, Tooltip } from "antd";
import { DeleteFilled, DollarCircleFilled, EditFilled, PrinterFilled, UndoOutlined } from "@ant-design/icons";

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onPrint?: () => void;
  onPay?: () => void;
  onReopen?: () => void;
  actions: Array<"edit" | "delete" | "print" | "pay" | "reopen">;
}

export default function TableActions({
  onEdit,
  onDelete,
  onPrint,
  onPay,
  onReopen,
  actions
}: TableActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {actions.includes("edit") && (
        <Tooltip title="Editar">
          <Button
            style={{ color: "gray" }}
            type="text"
            icon={<EditFilled style={{ fontSize: "18px" }} />}
            onClick={onEdit}
            aria-label="Editar"
            size="middle"
          />
        </Tooltip>
      )}
      {actions.includes("delete") && (
        <Tooltip title="Deletar">
          <Button
            style={{ color: "gray" }}
            type="text"
            icon={<DeleteFilled style={{ fontSize: "18px" }} />}
            onClick={onDelete}
            aria-label="Deletar"
            size="middle"
          />
        </Tooltip>
      )}
      {actions.includes("print") && (
        <Tooltip title="Imprimir">
          <Button
            style={{ color: "gray" }}
            type="text"
            icon={<PrinterFilled style={{ fontSize: "18px" }} />}
            onClick={onPrint}
            aria-label="Imprimir"
            size="middle"
          />
        </Tooltip>
      )}
      {actions.includes("pay") && (
        <Tooltip title="Efetuar">
          <Button
            style={{ color: "gray" }}
            type="text"
            icon={<DollarCircleFilled style={{ fontSize: "18px" }} />}
            onClick={onPay}
            aria-label="Efetuar"
            size="middle"
          />
        </Tooltip>
      )}
      {actions.includes("reopen") && (
        <Tooltip title="Reabrir">
          <Button
            style={{ color: "gray" }}
            type="text"
            icon={<UndoOutlined style={{ fontSize: "18px" }} />}
            onClick={onReopen}
            aria-label="Reabrir"
            size="middle"
          />
        </Tooltip>
      )}
    </div>
  );
}
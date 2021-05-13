import { Input } from "antd";

export default function CustomInput({
  placeholder,
  width,
}: {
  placeholder: string;
  width: number;
}) {
  return (
    <Input
      placeholder={placeholder}
      style={{
        borderRadius: 16,
        width: width,
        backgroundColor: "#333",
        border: "none",
      }}
    />
  );
}

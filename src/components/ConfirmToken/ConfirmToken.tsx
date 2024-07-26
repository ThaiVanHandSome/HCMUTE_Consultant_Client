import { Button, Divider, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

const ConfirmToken = ({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [inpVal, setInpVal] = useState<string>("");

  return (
    <section>
      <Input
        value={inpVal}
        label="Mã xác nhận"
        isRequired
        variant="flat"
        className="mb-4"
        onChange={(e) => setInpVal(e.target.value)}
      />
      <Button
        color="primary"
        className="w-full"
        isDisabled={inpVal.length === 0}
      >
        Xác nhận
      </Button>
      <Divider className="w-full my-4" />
      <p className="text-sm text-center text-slate-500 mb-4">hoặc</p>
      <Button className="w-full" color="primary" variant="bordered">
        Gửi mã xác nhận lần nữa
      </Button>
    </section>
  );
};

export default ConfirmToken;

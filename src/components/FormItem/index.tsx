import { Input, Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";
import { useField } from "formik";
import { ReactNode, useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Icons";

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
  children?: ReactNode;
};

type SelectProps = {
  label: string;
  items: {
    value: string | number;
    label: string;
  }[];
  defaultValue: string | number;
  setState: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

export const MyTextInp = ({
  label,
  placeholder,
  isDisabled,
  isRequired,
  className,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={clsx("mb-3", className)}>
      <Input
        placeholder={placeholder}
        isDisabled={isDisabled}
        isRequired={isRequired}
        variant="flat"
        type="text"
        label={label}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="ms-2 text-sm text-red-600 font-bold">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyPasswordInp = ({
  label,
  isDisabled,
  isRequired,
  className,
  placeholder,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className={clsx(className, "mb-3")}>
      <Input
        label={label}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isRequired={isRequired}
        variant="flat"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="ms-2 text-sm text-red-600 font-bold">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({
  label,
  items,
  defaultValue,
  setState,
  ...props
}: SelectProps) => (
  <Select
    defaultSelectedKeys={[defaultValue]}
    label={label}
    {...props}
    className="mb-4"
    onSelectionChange={(keys) => {
      if (keys === "all") {
        console.log("All options are selected");
      } else if (typeof keys === "object") {
        const selectedKeys = keys.anchorKey;
        setState(selectedKeys);
      } else {
        console.log("Unexpected selection type");
      }
    }}
  >
    {items.map((item: { value: string | number; label: string }) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </Select>
);

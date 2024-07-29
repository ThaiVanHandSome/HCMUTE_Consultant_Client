import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyPasswordInp, MySelect, MyTextInp } from "../../components/FormItem";
import { Button } from "@nextui-org/react";
import { genders } from "../../assets/static/data";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Status from "./Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import ConfirmToken from "../../components/ConfirmToken";
import { Link } from "react-router-dom";
import { routes } from "~/config";

const Register = () => {
  const [selectedGender, setSelectedGender] = useState<
    string | number | undefined
  >("male");

  const [isConfirmSuccess, setIsConfirmSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(1);

  useEffect(() => {
    if (isConfirmSuccess) {
      setStatus((prev) => prev + 1);
    }
  }, [isConfirmSuccess]);

  return (
    <section>
      <h1 className="font-bold text-4xl mb-4 text-center">ĐĂNG KÝ</h1>
      <div className="flex items-center justify-center">
        <div className="flex-col lg:flex-row flex items-start lg:items-center my-6">
          <Status
            status={status > 1 ? "success" : "progress"}
            icon={<FontAwesomeIcon icon={faUser} />}
            title="Bước 1"
            desc="Tạo tài khoản"
          />
          <div
            className={clsx(
              "lg:w-[150px] lg:h-[2px] w-[2px] h-[40px] bg-slate-400 mx-2",
              {
                "bg-success-600": status >= 2,
              }
            )}
          ></div>
          <Status
            status={status > 2 ? "success" : status === 2 ? "progress" : ""}
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            title="Bước 2"
            desc="Xác nhận tài khoản"
          />
          <div
            className={clsx(
              "lg:w-[150px] lg:h-[2px] w-[2px] h-[40px] bg-slate-400 mx-2",
              {
                "bg-success-600": status >= 3,
              }
            )}
          ></div>
          <Status
            status={status > 3 ? "success" : status === 3 ? "progress" : ""}
            icon={<FontAwesomeIcon icon={faCheckCircle} />}
            title="Bước 3"
            desc="Đăng ký thành công"
          />
        </div>
      </div>
      <div className="px-72">
        <div className="p-4 shadow-lg rounded-2xl">
          {status === 1 && (
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                passwordAgain: "",
              }}
              validationSchema={Yup.object({
                fullName: Yup.string()
                  .required("Bạn phải nhập trường này!")
                  .min(5, "Bạn phải nhập tối thiểu 5 ký tự!"),
                email: Yup.string()
                  .required("Bạn phải nhập trường này!")
                  .min(5, "Bạn phải nhập tối thiểu 5 ký tự!")
                  .email("Email không hợp lệ!"),
                phoneNumber: Yup.string()
                  .required("Bạn phải nhập trường này!")
                  .min(5, "Bạn phải nhập tối thiểu 5 ký tự!")
                  .matches(/^0\d{9}$/, "Bạn phải nhập số điện thoại hợp lệ!"),
                password: Yup.string()
                  .required("Bạn phải nhập trường này!")
                  .matches(
                    /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^A-Za-z0-9]).{6,})\S$/,
                    "Bạn phải nhập mật khẩu hợp lệ! Mật khẩu phải dài ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
                  ),
                passwordAgain: Yup.string()
                  .required("Bạn phải nhập trường này!")
                  .oneOf([Yup.ref("password")], "Mật khẩu không khớp!"),
              })}
              onSubmit={() => {
                toast.success("Đăng ký thành công!");
              }}
            >
              <Form>
                <MyTextInp label="Họ và tên" name="fullName" isRequired />
                <MyTextInp label="Email" name="email" isRequired />
                <MyTextInp
                  label="Số điện thoại"
                  name="phoneNumber"
                  isRequired
                />
                <MySelect
                  label="Giới tính"
                  items={genders}
                  defaultValue="male"
                  setState={setSelectedGender}
                />
                <MyPasswordInp label="Mật khẩu" name="password" isRequired />
                <MyPasswordInp
                  label="Nhập lại mật khẩu"
                  name="passwordAgain"
                  isRequired
                />
                <p className="text-sm font-semibold">
                  Đã có tài khoản?{" "}
                  <Link to={routes.login} className="text-primary-600">
                    Đăng nhập
                  </Link>
                </p>
                <Button color="primary" className="w-full" type="submit">
                  Đăng ký
                </Button>
              </Form>
            </Formik>
          )}
          {status === 2 && (
            <ConfirmToken setIsConfirmSuccess={setIsConfirmSuccess} />
          )}
          {status === 3 && (
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-lg text-secondary mb-4 text-center">
                Chúc mừng bạn đã đăng ký tài khoản thành công!
              </h2>
              <Link to={routes.login}>
                <Button color="primary">Quay lại đăng nhập</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;

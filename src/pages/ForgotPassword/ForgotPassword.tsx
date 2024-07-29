import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInp } from "~/components/FormItem";
import BackgroundImage from "~/assets/images/backgrounds/background_login_3.jpg";
import { useEffect, useState } from "react";
import ConfirmToken from "~/components/ConfirmToken";

const ForgotPassword = () => {
  const [status, setStatus] = useState<number>(2);
  const [isConfirmSuccess, setIsConfirmSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isConfirmSuccess) {
      setStatus((prev) => prev + 1);
    }
  }, [isConfirmSuccess]);

  return (
    <section className="px-24 py-8">
      <div className="flex ps-6 pt-2 shadow-lg rounded-2xl min-h-[90vh]">
        <div className="w-1/3 pt-4">
          <h1 className="font-bold text-3xl mb-3 text-center">Quên mật khẩu</h1>
          <div>
            {status === 1 && (
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .required("Bạn phải nhập trường này!")
                    .min(5, "Bạn phải nhập tối thiểu 5 ký tự!")
                    .email("Email không hợp lệ!"),
                  password: Yup.string()
                    .required("Bạn phải nhập trường này!")
                    .matches(
                      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^A-Za-z0-9]).{6,})\S$/,
                      "Bạn phải nhập mật khẩu hợp lệ! Mật khẩu phải dài ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
                    ),
                })}
                onSubmit={() => {}}
              >
                <Form>
                  <MyTextInp label="Email" name="email" isRequired />
                  <Button color="primary" className="w-full mb-2" type="submit">
                    Yêu cầu
                  </Button>
                </Form>
              </Formik>
            )}
            {status === 2 && (
              <ConfirmToken setIsConfirmSuccess={setIsConfirmSuccess} />
            )}
          </div>
        </div>
        <div className="flex-1 ps-6">
          <img
            alt="hcmute"
            src={BackgroundImage}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

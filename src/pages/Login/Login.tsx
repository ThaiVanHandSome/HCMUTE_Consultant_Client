import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { MyPasswordInp, MyTextInp } from "~/components/FormItem";
import { routes } from "~/config";
import BackgroundImage from "~/assets/images/backgrounds/background_login_3.jpg";

const Login = () => {
  return (
    <section className="px-24 py-8">
      <div className="flex ps-6 pt-2 shadow-lg rounded-2xl min-h-[90vh]">
        <div className="w-1/3 pt-4">
          <h1 className="font-bold text-3xl mb-3 text-center">Đăng nhập</h1>
          <div>
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
                <MyPasswordInp label="Mật khẩu" name="password" isRequired />
                <Link
                  to={routes.forgotPassword}
                  className="inline-block text-sm font-semibold text-primary-600 mb-4 ms-2 cursor-pointer"
                >
                  Quên mật khẩu?
                </Link>
                <Button color="primary" className="w-full mb-2" type="submit">
                  Đăng nhập
                </Button>
                <p className="text-sm font-semibold text-center">
                  Không có tài khoản?{" "}
                  <Link to={routes.register} className="text-primary-600">
                    Đăng ký ngay
                  </Link>
                </p>
              </Form>
            </Formik>
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

export default Login;

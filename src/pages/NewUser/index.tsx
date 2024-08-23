import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useFormik } from "formik";
import { schema } from "~/helpers/schemaRegisterForm";
import { cpfMask } from "~/helpers/cpfMask";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import createRegistration from "~/services/api/createRegistration";
import { toast } from "react-toastify";
import { useFecthData } from "~/hooks/useFetchData";
import { InputForm } from "~/types/InputForm";

async function createAdmission(values: InputForm) {
  const registration: Registration = {
    employeeName: values.employeeName,
    admissionDate: values.date,
    cpf: values.cpf,
    email: values.email,
    status: RegistrationStatus.REVIEW,
  };

  await createRegistration(registration);
}

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { setRefresh } = useFecthData();

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      email: "",
      cpf: "",
      date: "",
    } as InputForm,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await createAdmission(values);
        toast.success("Admissão criada com sucesso");
        goToHome();
        setRefresh(true);
      } catch (error) {
        toast.error("Não possível registrar a admissão. Tente novamente");
      }
    },
  });

  const InfoErrorText = (
    hasError: boolean | undefined,
    msgError: string | undefined
  ) => {
    return (
      <>{hasError && msgError ? <S.InfoError>{msgError}</S.InfoError> : null}</>
    );
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.employeeName}
          name="employeeName"
        />
        {InfoErrorText(formik.touched.employeeName, formik.errors.employeeName)}
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
        />
        {InfoErrorText(formik.touched.email, formik.errors.email)}

        <TextField
          placeholder="CPF"
          label="CPF"
          name="cpf"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            if (e.target?.value) {
              e.target.value = cpfMask(e.target.value);
              formik.setFieldValue("cpf", e.target.value);
            }
          }}
          value={formik.values.cpf}
        />
        {InfoErrorText(formik.touched.cpf, formik.errors.cpf)}

        <TextField
          label="Data de admissão"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
          name="date"
        />
        {InfoErrorText(formik.touched.date, formik.errors.date)}

        <Button onClick={formik.handleSubmit} type="submit">
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;

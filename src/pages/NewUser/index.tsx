import TextField from "~/components/TextField";
import * as S from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import IconButton from "~/components/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useFormik } from "formik";
import { schema } from "~/helpers/registerFormSchema";
import { cpfMask } from "~/helpers/cpfMask";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import createRegistration from "~/services/api/createRegistration";
import { toast } from "react-toastify";
import { useFecthData } from "~/components/contexts/RegistrationData";
import { InputForm } from "~/types/InputForm";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";
import ButtonPrimary from "~/components/Buttons/ButtonPrimary";

async function createAdmission(values: InputForm): Promise<Registration | null> {
  const registration: Registration = {
    employeeName: values.employeeName,
    admissionDate: values.date,
    cpf: deleteMaskCpf(values.cpf),
    email: values.email,
    status: RegistrationStatus.REVIEW,
  };

  return await createRegistration(registration);
}

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { setRegistrations, registrations } = useFecthData();

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
        const newRegistration = await createAdmission(values);
        newRegistration && setRegistrations([...registrations, newRegistration])
        toast.success("Admissão criada com sucesso", {toastId: "create-success"});
        goToHome();
      } catch (error) {
        toast.error("Não possível registrar a admissão. Tente novamente", {toastId: "create-error"});
      }
    },
  });

  const infoErrorText = (
    hasError: boolean | undefined,
    msgError: string | undefined
  ) => {
    return hasError && msgError ? msgError: undefined;
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
          error={infoErrorText(formik.touched.employeeName, formik.errors.employeeName)}
        />
        <TextField
          placeholder="E-mail"
          label="E-mail"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          error={infoErrorText(formik.touched.email, formik.errors.email)}
        />
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
          error={infoErrorText(formik.touched.cpf, formik.errors.cpf)}
        />

        <TextField
          label="Data de admissão"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
          name="date"
          placeholder="Data de admissão"
          error={infoErrorText(formik.touched.date, formik.errors.date)}
        />

        <ButtonPrimary onClick={() => formik.submitForm()} type="submit">
          Cadastrar
        </ButtonPrimary>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;

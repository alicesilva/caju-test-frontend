import Collumns from "../../components/Columns";
import * as S from "./styles";
import SearchBar from "../../components/Searchbar";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "~/components/ConfirmationModal";
import { useConfirmationModal } from "~/components/contexts/ModalContext";

const DashboardPage = () => {
  const { openModal } = useConfirmationModal();

  return (
    <>
      {openModal && <ConfirmationModal />}
      <S.Container>
        <SearchBar />
        <Collumns />
      </S.Container>
    </>
  );
};
export default DashboardPage;

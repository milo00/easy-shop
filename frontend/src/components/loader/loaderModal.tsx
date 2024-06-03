import { Container, Modal, ModalBody } from "reactstrap";
import Loader from "../loader/loader";

interface ILoaderModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
}

export const LOADER_MODAL_ID = "LOADER_MODAL_ID";

const LoaderModal = (props: ILoaderModalProps) => {
  return (
    <Modal
      id={LOADER_MODAL_ID}
      isOpen={props.isOpen}
      className="modal-xl"
      // style={{ minWidth: "fit-content", overflow: "hidden" }}
    >
      <ModalBody>
        <Container
          fluid
          className="d-flex h-100 w-100 justify-content-center flex-column gap-3"
        >
          <Loader loading={props.isOpen} basic />
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default LoaderModal;

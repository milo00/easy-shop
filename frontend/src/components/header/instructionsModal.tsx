import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Loader from "../loader/loader";

interface IInstructionsModalProps {
  isOpen: boolean;
  onCloseCallback: VoidFunction;
}

const InstructionsModal = (props: IInstructionsModalProps) => {
  return (
    <Modal className="modal-lg" isOpen={props.isOpen}>
      <ModalHeader>Instrukcje</ModalHeader>
      <ModalBody>
        <Container
          fluid
          className="d-flex h-100 w-100 justify-content-center flex-column gap-3"
        >
          <Row>
            <h5> Co należy zrobić?</h5>
            <span>
              <ul>
                <li>
                  <strong>Zadanie 1:</strong> Wejdź na stronę główną aplikacji,
                  załóż konto i zaloguj się.
                  <br />
                  <span style={{ fontSize: "smaller" }}>
                    Do rejestracji wymagane jest imie i nazwisko oraz hasło -
                    proszę abyś je zapamiętał/a do wykorzystania w następnych
                    badaniach.
                  </span>
                </li>
                <li>
                  <strong>Zadanie 2:</strong> Wyszukaj i dodaj do koszyka 3
                  produkty z różnych kategorii.
                </li>
                <li>
                  <strong>Zadanie 3:</strong> Przejdź do koszyka, wprowadź kod
                  promocyjny EASY-SHOP i sfinalizuj zamówienie.
                </li>
              </ul>
            </span>
          </Row>
          <Row className="pt-3">
            <h5>Jak będzie przebiegać badanie?</h5>
            <span>
              <ol>
                <li>
                  Wykonaj zadania zgodnie z podanymi instrukcjami.
                  <br />
                  <span style={{ fontSize: "smaller" }}>
                    Jeśli potrzebujesz przypomnienia o kolejnych krokach w
                    trakcie wykonywania badania, możesz zawsze wrócić do
                    instrukcji, klikając poniższy przycisk na górnym pasku.
                  </span>
                  <br />
                  <div className="py-3 d-flex justify-content-center w-100">
                    <Button outline color="primary">
                      instructions
                    </Button>
                  </div>
                </li>
                <li>
                  Gdy pojawi się poniższy wskaźnik ładowania i odczujesz
                  irytację, naciśnij klawisz <strong>Spacji</strong>.
                  <br />
                  <span style={{ fontSize: "smaller" }}>
                    Po naciśnięciu klawisza, w prawym górnym rogu aplikacji
                    pojawi się powiadomienie o zarejestrowaniu czasu irytacji.
                  </span>
                </li>
                <div className="my-5">
                  <Loader loading={true} basic />
                </div>
                <li>
                  Po wykonaniu zadań, wypełnij krótki kwestionariusz dotyczący
                  Twoich odczuć związanych z czasem odpowiedzi strony.
                </li>
              </ol>
            </span>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.onCloseCallback}>
          zamknij
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InstructionsModal;

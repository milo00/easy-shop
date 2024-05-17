import { Button, Container, Row } from "reactstrap";
import Loader from "../components/loader/loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { INTRO_DONE_TOKEN } from "../utils/localStorageTokens";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === " ") {
        console.log("here");

        toast("Irritation time registered");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onClick = () => {
    sessionStorage.setItem(INTRO_DONE_TOKEN, "true");
    navigate("/");
  };

  return (
    <Container
      fluid
      className="d-flex h-100 w-100 justify-content-center p-5 flex-column gap-3"
    >
      <Row className="pb-3 border-bottom">
        <h2>Witam na stronie badania.</h2>
        <h5 className="fw-light">
          Dotyczy ono wpływu czasu odpowiedzi aplikacji internetowej na
          satysfakcję użytkowników.
        </h5>
      </Row>
      <Row className="pt-3">
        <h5>Jak będzie przebiegać badanie?</h5>
        <span>
          <ol>
            <li>
              Wykonaj zadania zgodnie z podanymi instrukcjami.
              <br />
              <span style={{ fontSize: "smaller" }}>
                Jeśli potrzebujesz przypomnienia o kolejnych krokach w trakcie
                wykonywania badania, możesz zawsze wrócić do instrukcji,
                klikając poniższy przycisk na górnym pasku.
              </span>
              <br />
              <div className="py-3 d-flex justify-content-center w-100">
                <Button outline color="primary">
                  instructions
                </Button>
              </div>
            </li>
            <li>
              Gdy pojawi się poniższy wskaźnik ładowania i odczujesz irytację,
              naciśnij klawisz <strong>Spacji</strong>.
              <br />
              <span style={{ fontSize: "smaller" }}>
                Po naciśnięciu klawisza, w prawym górnym rogu aplikacji pojawi
                się powiadomienie o zarejestrowaniu czasu irytacji.
                <br />
                Możesz teraz przetestować tę funkcję.
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
      <Row>
        <h5> Co należy zrobić?</h5>
        <span>
          <ul>
            <li>
              <strong>Zadanie 1:</strong> Wejdź na stronę główną aplikacji,
              załóż konto i zaloguj się.
              <br />
              <span style={{ fontSize: "smaller" }}>
                Do rejestracji wymagane jest imie i nazwisko oraz hasło - proszę
                abyś je zapamiętał/a do wykorzystania w następnych badaniach.
              </span>
            </li>
            <li>
              <strong>Zadanie 2:</strong> Wyszukaj i dodaj do koszyka 3 produkty
              z różnych kategorii.
            </li>
            <li>
              <strong>Zadanie 3:</strong> Przejdź do koszyka, wprowadź kod
              promocyjny <strong>EASY-SHOP</strong> w{" "}
              <strong>podsumowaniu zamówienia w koszyku</strong> i sfinalizuj
              zamówienie.
            </li>
          </ul>
        </span>
      </Row>
      <Row className="gap-4">
        <div>
          <h5>Dlaczego jest to ważne?</h5>
          <span>
            Twoje opinie i reakcje są kluczowe dla mojego badania. Pomogą mi one
            zidentyfikować momenty, w których czas oczekiwania jest najbardziej
            frustrujący oraz jakie strategie najlepiej minimalizują negatywne
            odczucia użytkowników.
          </span>
        </div>
        <div>
          <h5>Informacja dla uczestników</h5>
          <span>
            Twoje dane są bardzo ważne. Wszelkie zebrane informacje zostaną
            wykorzystane wyłącznie do celów badawczych i będą przechowywane w
            sposób bezpieczny.
          </span>
        </div>
      </Row>
      <Row className="py-3 d-flex justify-content-center w-100">
        <Button color="primary" style={{ width: "auto" }} onClick={onClick}>
          zaczynajmy!
        </Button>
      </Row>
    </Container>
  );
};

export default Instructions;

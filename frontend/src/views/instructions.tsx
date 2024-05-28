import { Button, Container, Row } from "reactstrap";
import Loader from "../components/loader/loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { INTRO_DONE_TOKEN } from "../utils/localStorageTokens";
import { useNavigate } from "react-router-dom";
import popUpSound from "../assets/happy-pop.mp3";

const Instructions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === " ") {
        toast("Zarejestrowano czas irytacji");
        var audio = new Audio(popUpSound);
        try {
          audio.play();
        } catch (err) {
          console.log("Failed to play, error: " + err);
        }
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
                  instrukcje
                </Button>
              </div>
            </li>
            <li>
              Gdy pojawi się <strong>poniższy wskaźnik ładowania</strong> i
              odczujesz irytację, naciśnij klawisz <strong>Spacji</strong>.
              <br />
              <span style={{ fontSize: "smaller" }}>
                Po naciśnięciu klawisza usłysz krótki dźwięk, a w prawym górnym
                rogu aplikacji pojawi się powiadomienie o zarejestrowaniu czasu
                irytacji.
                <br />
                Możesz teraz przetestować tę funkcję.
              </span>
            </li>
            <div className="my-5">
              <Loader loading={true} basic width={50} loop />
            </div>
            <li>
              Po wykonaniu zadań, wypełnij krótki kwestionariusz dotyczący
              Twoich odczuć związanych z czasem odpowiedzi strony.
            </li>
            <li>
              <strong>
                Pamiętaj, że{" "}
                <span className="text-danger">
                  poza imieniem, nazwiskiem i datą urodzenia
                </span>
                , wszystkie podane przez Ciebie dane mogą być fikcyjne.
              </strong>
            </li>
          </ol>
        </span>
      </Row>
      <Row>
        <h5> Co należy zrobić?</h5>
        <span>
          <ul>
            <li>
              <strong>Zadanie 1:</strong> Wejdź na stronę główną aplikacji i{" "}
              <strong>zaloguj się na wcześniej założone konto.</strong>
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

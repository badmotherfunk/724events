import { fireEvent, render, screen} from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import EventList from "../../containers/Events";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

// Ajout des tests unitaires
describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    expect(screen.getByTestId("event-testid")).toBeInTheDocument();
  })
  it("a list of people is displayed", () => {
    render(<Home/>);
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
  })
  it("a footer is displayed", () => {
    render(<Home/>);
    expect(screen.getByTestId("footer-testid")).toBeInTheDocument();
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home/>);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  }); 
})


// Tests fonctionnels //

// Test de la dernière prestation affichée
const data = {
  events: [
    {
      "id": 4,
      "type": "conférence",
      "date": "2022-08-29T20:28:45.744Z",
      "title": "Conférence #productCON",
      "cover": "/images/headway-F2KRf_QfCqw-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
          "1 espace d’exposition",
          "1 scéne principale",
          "2 espaces de restaurations",
          "1 site web dédié"
      ]
    },
  ]
}

describe("When a last prestation is created", () => {
  it("a list of informations are displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );
    await screen.findByText("Conférence #productCON");
    await screen.findByText("août");
    await screen.findByText("conférence");
  })
});


// Vérification de la confirmation du message à l'envoi du formulaire
describe("When a message is send", () => {
  it("a success message is displayed", async () => {
    render(<Home />);
    fireEvent(
      await screen.findByText("Envoyer"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    await screen.findByText("En cours");
    await screen.findByText("Message envoyé !");
  });
});

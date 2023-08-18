import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Changement de l'opérateur pour afficher les projets du plus récent au plus anciens
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ); 

  const goToSlide = (radioIdx) => {
    setIndex(radioIdx)
  }

  useEffect(() => {
    const nextCard = setTimeout(
      // Ajout de la condition "- 1" à byDateDesc pour indiquer le dernier élément du tableau
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000)
    return () => clearTimeout(nextCard);
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout de la key dans la div parent
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((focus, radioIdx) => (
                <input
                // Modification de la key
                  key={`${focus.title}`}
                  type="checkbox"
                  name={`button-radio ${radioIdx}`}
                  // idx remplacé par index pour le défilement des boutons radio
                  checked={index === radioIdx}
                  onChange={() => goToSlide(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
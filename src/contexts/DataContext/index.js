import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      const response = await api.loadData();
      setData(response);
      // Ajout du tri pour récupérer le dernier évènement
      const currentDate = new Date()
      const lastEvent = response.events
        .filter((event) => new Date(event.date).getTime() < currentDate.getTime())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      // On ajoute au state notre dernier évènement trié
      setLast(lastEvent)
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // Ajout du state du dernier événement au provider
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
